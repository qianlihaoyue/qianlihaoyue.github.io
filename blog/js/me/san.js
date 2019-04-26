Object.getOwnPropertyNames(Math).map(function(p) {
  window[p] = Math[p];
});

var rand = function(max, min, is_int) {
  var max = (max - 1 || 0) + 1, 
      min = min || 0, 
      gen = min + (max - min)*random();
  
  return (is_int)?round(gen):gen;
};

var σ = function(c) {
  return (random() < (c || .5))?-1:1;
}

var N_POLY = 32, 
    c = document.querySelector('canvas'), 
    ctx = c.getContext('2d'), 
    w = 150, h = 150, 
    polygons = [], 
    t = 0, r_id = null, 
    rep_pt = {'x': 0, 'y': 0}, 
    cutoff_d = 169;

var Poly = function(n, R, o, φ, hue, v, af, ω) {
  this.n = n || rand(7, 3, 1);
  this.α = 2*PI/this.n;
  this.R = R || rand(16, 8);
  this.o = o || null;
  this.φ = φ || rand(PI/2);
  this.hue = hue || rand(360, 0, 1);
  this.c = 'hsl(' + this.hue + ',100%,80%)';
  this.v = v || null;
  this.af = af || (25 - this.R)/250 - 1;
  this.ω = ω || σ()*rand(2, .25)*PI/180;
  this.vertices = [];
  
  this.init = function() {
    var θ = 0;
    
    if(!this.o) {
      this.o = {
        'x': rand(w - this.R, this.R, 1), 
        'y': rand(h - this.R, this.R, 1)
      };
    }
    
    if(!this.v) {
      this.v = {
        'x': σ()*rand(2, .5), 
        'y': σ()*rand(2, .5)
      };
    }
    
    for(var i = 0; i < this.n; i++) {
      θ = i*this.α + this.φ;
            
      this.vertices.push({
        'x': this.o.x + this.R*cos(θ), 
        'y': this.o.y + this.R*sin(θ)
      });
    }
  };
  
  this.move = function() {
    this.v.x += ~~(2/(this.o.x - rep_pt.x));
    this.v.y += ~~(2/(this.o.y - rep_pt.y));
    
    if(this.v.x > 4) { this.v.x = 4; }
    if(this.v.y > 4) { this.v.y = 4; }
    if(this.v.x < -4) { this.v.x = -4; }
    if(this.v.y < -4) { this.v.y = -4; }
    
    this.o.x += this.v.x;
    this.o.y += this.v.y;
    
    this.φ += this.ω;
    this.hue += σ(.8)*rand(5, 1, 1);
    this.c = 'hsl(' + this.hue + ',100%,80%)';
    
    if(this.o.x < this.R) {
      this.o.x = this.R;
      this.v.x *= this.af;
    }
    if(this.o.x > w - this.R) {
      this.o.x = w - this.R;
      this.v.x *= this.af;
    }
    if(this.o.y < this.R) {
      this.o.y = this.R;
      this.v.y *= this.af;
    }
    if(this.o.y > h - this.R) {
      this.o.y = h - this.R;
      this.v.y *= this.af;
    }
    
    for(var i = 0; i < N_POLY; i++) {
      if(polygons[i] != this) {
        if(abs(this.o.x - polygons[i].o.x) < (this.R + polygons[i].R) && 
           abs(this.o.y - polygons[i].o.y) < (this.R + polygons[i].R)) {
          this.o.x -= this.v.x;
          polygons[i].o.x -= polygons[i].v.x;
          this.v.x *= -1;
          polygons[i].v.x *= -1;
          this.o.y -= this.v.y;
          polygons[i].o.y -= polygons[i].v.y;
          this.v.y *= -1;
          polygons[i].v.y *= -1;
        }
      }
    }
    
    for(var i = 0; i < this.n; i++) {
      θ = i*this.α + this.φ;
            
      this.vertices[i] = {
        'x': this.o.x + this.R*cos(θ), 
        'y': this.o.y + this.R*sin(θ)
      };
    }
  };
  
  this.draw = function(ctxt) {
    ctxt.lineWidth = 3;
    ctxt.strokeStyle = this.c;
    ctxt.beginPath();
    
    for(var i = 0; i < this.n; i++) {
      if(i == 0) {
        ctxt.moveTo(this.vertices[i].x, this.vertices[i].y);
      }
      else {
        ctxt.lineTo(this.vertices[i].x, this.vertices[i].y);
      }
    }
    
    ctxt.closePath();
    ctxt.stroke();
  };
  
  this.connectTo = function(ctxt, poly) {
    var min_d = max(w, h), conn_i, conn_j, 
        curr_d, dx, dy, 
        c0, c1, g, la;
    
    for(var i = 0; i < this.n; i++) {
      for(var j = 0; j < poly.n; j++) {
        dx = this.vertices[i].x - poly.vertices[j].x;
        dy = this.vertices[i].y - poly.vertices[j].y;
        curr_d = sqrt(pow(dx, 2) + pow(dy, 2));
        if(min_d > curr_d) {
          min_d = curr_d;
          conn_i = i;
          conn_j = j;
        }
      }
    }
    
    if(min_d < cutoff_d) {
      la = (1 - min_d/cutoff_d);
      c0 = 'hsla(' + this.hue + ',100%,80%,' + la + ')';
      c1 = 'hsla(' + poly.hue + ',100%,80%,' + la + ')';
      g = ctxt.createLinearGradient(
        this.vertices[conn_i].x, 
        this.vertices[conn_i].y, 
        poly.vertices[conn_j].x, 
        poly.vertices[conn_j].y
      );
      g.addColorStop(0, c0);
      g.addColorStop(1, c1);
      
      ctxt.strokeStyle = g;
      ctxt.beginPath();
      ctxt.moveTo(this.vertices[conn_i].x, 
        this.vertices[conn_i].y);
      ctxt.lineTo(poly.vertices[conn_j].x, 
        poly.vertices[conn_j].y);
      ctxt.closePath();
      ctxt.stroke()
    }
  };
};

var init = function() {
  var s = getComputedStyle(c);
  
  if(r_id) {
    cancelAnimationFrame(r_id);
  }
  
  w = c.width = ~~s.width.split('px')[0];
  h = c.height = ~~s.height.split('px')[0];
  
  rep_pt = {'x': w/2, 'y': h/2};
  
  for(var i = 0; i < N_POLY; i++) {
    polygons.push(new Poly());
    polygons[i].init();
  }
  
  draw();
};

var draw = function() {
  var hue_diff;
  
  ctx.clearRect(0, 0, w, h);
  
  for(var i = 0; i < N_POLY; i++) {
    polygons[i].move();
    polygons[i].draw(ctx);
    
    for(var j = 0; j < i; j++) {
      hue_diff = abs(polygons[i].hue - polygons[j].hue);
      
      if(hue_diff < 32 || hue_diff > 328) {
        polygons[i].connectTo(ctx, polygons[j]);
      }
    }
  }
  
  t++;
  
  r_id = requestAnimationFrame(draw);
};

setTimeout(function() {
  init();
  
  addEventListener('resize', init, false);
  
  c.addEventListener('mousemove', function(e) {
    rep_pt = {'x': e.clientX, 'y': e.clientY}
  }, false);
}, 15);