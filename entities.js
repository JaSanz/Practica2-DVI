var sprites = {
titulo: {sx: 8, sy: 395, w: 411, h: 161, frames: 1},
fondo: {sx: 421, sy: 0, w: 550, h: 624, frames: 1},
coche_azul: {sx: 8, sy: 5, w: 90, h: 50, frames: 1},
coche_verde: {sx: 108, sy: 5, w: 96, h: 50, frames: 1},
coche_amarillo: {sx: 213, sy: 5, w: 95, h: 50, frames: 1},
camion_bomberos: {sx: 6, sy: 62, w: 125, h: 45, frames: 1},
camion_grande: {sx: 147, sy: 62, w: 200, h: 47, frames: 1},
tronco_pequeño: {sx: 270, sy: 171, w: 130, h: 40, frames: 1},
tronco_mediano: {sx: 9, sy: 122, w: 191, h: 40, frames: 1},
tronco_grande: {sx: 9, sy: 171, w: 247, h: 40, frames: 1},
calaveras: {sx: 211, sy: 128, w: 45, h: 35, frames: 4},
nenufar: {sx: 3, sy: 234, w: 45, h: 41, frames: 1},
mosca: {sx: 54, sy: 239, w: 36, h: 34, frames: 1},
tile_azul: {sx: 157, sy: 224, w: 58, h: 58, frames: 1},
tile_verde: {sx: 94, sy: 224, w: 58, h: 58, frames: 1},
tile_negro: {sx: 221, sy: 224, w: 58, h: 58, frames: 1},
arbusto: {sx: 285, sy: 224, w: 58, h: 58, frames: 1},
arbusto_nenufar: {sx: 348, sy: 224, w: 58, sy: 58, frames: 1},
tortuga: {sx: 5, sy: 288, w: 49, h: 46, frames: 1},
rana: {sx: 0, sy: 339, w: 40, h: 53, frames: 7}
};

var OBJECT_PLAYER = 1;
    //OBJECT_PLAYER_PROJECTILE = 2,
    //OBJECT_ENEMY = 4,
    //OBJECT_ENEMY_PROJECTILE = 8,
    //OBJECT_POWERUP = 16;


/// CLASE PADRE SPRITE
var Sprite = function()  
 { }

Sprite.prototype.setup = function(sprite,props) {
  this.sprite = sprite;
  this.merge(props);
  this.frame = this.frame || 0;
  this.w =  SpriteSheet.map[sprite].w;
  this.h =  SpriteSheet.map[sprite].h;
}

Sprite.prototype.merge = function(props) {
  if(props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
}
Sprite.prototype.draw = function(ctx) {
  SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
}

Sprite.prototype.hit = function(damage) {
  this.board.remove(this);
}

/*var PlayerShip = function() { 

  this.setup('ship', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

   this.x = Game.width/2 - this.w / 2;
   this.y = Game.height - 10 - this.h;

   this.reload = this.reloadTime;


   this.step = function(dt) {
     if(Game.keys['left']) { this.vx = -this.maxVel; }
     else if(Game.keys['right']) { this.vx = this.maxVel; }
     else { this.vx = 0; }

     this.x += this.vx * dt;

     if(this.x < 0) { this.x = 0; }
     else if(this.x > Game.width - this.w) { 
       this.x = Game.width - this.w 
     }

    this.reload-=dt;
    if(Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      this.board.add(new PlayerMissile(this.x,this.y+this.h/2));
      this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2));
    }

   }

}

PlayerShip.prototype = new Sprite();
PlayerShip.prototype.type = OBJECT_PLAYER;

PlayerShip.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
    loseGame();
  }
}


///// EXPLOSION

var Explosion = function(centerX,centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
  this.subFrame = 0;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
  this.frame = Math.floor(this.subFrame++ / 3);
  if(this.subFrame >= 36) {
    this.board.remove(this);
  }
};



/// Player Missile


var PlayerMissile = function(x,y) {
  this.setup('missile',{ vy: -700, damage: 10 });
  this.x = x - this.w/2; 
  this.y = y - this.h; 
};

PlayerMissile.prototype = new Sprite();
PlayerMissile.prototype.type = OBJECT_PLAYER_PROJECTILE;


PlayerMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  if(this.y < -this.h) { this.board.remove(this); }

  var collision = this.board.collide(this,OBJECT_ENEMY);
    if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y < -this.h) { 
      this.board.remove(this); 
  }


};



/// ENEMIES

var enemies = {
  straight: { x: 0,   y: -50, sprite: 'enemy_ship', health: 10, 
              E: 100 },
  ltr:      { x: 0,   y: -100, sprite: 'enemy_purple', health: 10, 
              B: 200, C: 1, E: 200  },
  circle:   { x: 400,   y: -50, sprite: 'enemy_circle', health: 10, 
              A: 0,  B: -200, C: 1, E: 20, F: 200, G: 1, H: Math.PI/2 },
  wiggle:   { x: 100, y: -50, sprite: 'enemy_bee', health: 20, 
              B: 100, C: 4, E: 100 },
  step:     { x: 0,   y: -50, sprite: 'enemy_circle', health: 10,
              B: 300, C: 1.5, E: 60 }
};


var Enemy = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
}

Enemy.prototype = new Sprite();
Enemy.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, health: 20, damage: 10 };


Enemy.prototype.type = OBJECT_ENEMY;

Enemy.prototype.step = function(dt) {
  this.t += dt;
  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  if(this.y > Game.height ||
     this.x < -this.w ||
     this.x > Game.width) {
       this.board.remove(this);
  }

  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  }

}

Enemy.prototype.hit = function(damage) {
  this.health -= damage;
  if(this.health <=0) {
    if(this.board.remove(this)) {
      this.board.add(new Explosion(this.x + this.w/2, 
                                   this.y + this.h/2));
    }
  }

}

/// STAR FIELD

var Starfield = function(speed,opacity,numStars,clear) {

  // Set up the offscreen canvas
  var stars = document.createElement("canvas");
  stars.width = Game.width; 
  stars.height = Game.height;
  var starCtx = stars.getContext("2d");

  var offset = 0;

  // If the clear option is set, 
  // make the background black instead of transparent
  if(clear) {
    starCtx.fillStyle = "#000";
    starCtx.fillRect(0,0,stars.width,stars.height);
  }

  // Now draw a bunch of random 2 pixel
  // rectangles onto the offscreen canvas
  starCtx.fillStyle = "#FFF";
  starCtx.globalAlpha = opacity;
  for(var i=0;i<numStars;i++) {
    starCtx.fillRect(Math.floor(Math.random()*stars.width),
                     Math.floor(Math.random()*stars.height),
                     2,
                     2);
  }

  // This method is called every frame
  // to draw the starfield onto the canvas
  this.draw = function(ctx) {
    var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;

    // Draw the top half of the starfield
    if(intOffset > 0) {
      ctx.drawImage(stars,
                0, remaining,
                stars.width, intOffset,
                0, 0,
                stars.width, intOffset);
    }

    // Draw the bottom half of the starfield
    if(remaining > 0) {
      ctx.drawImage(stars,
              0, 0,
              stars.width, remaining,
              0, intOffset,
              stars.width, remaining);
    }
  }

  // This method is called to update
  // the starfield
  this.step = function(dt) {
    offset += dt * speed;
    offset = offset % stars.height;
  }
}*/

//FONDO
var Fondo = function() {
  this.setup('fondo');

  this.x = 0;
  this.y = 0;

  this.step = function(dt) {}
};

Fondo.prototype = new Sprite();

//RANA
var Frog = function() {
  this.setup('rana', {vx: 0, vy: 0, maxVel: 48, jumpStep: 0.1, frame: 0});

  this.x = Game.width / 2 - this.w / 2;
  this.y = game.height - 10 - this.h + 19; //El +19 es para ajustarla completamente en el medio
  this.jumpTime = this.jumpStep;
  this.subFrame = 0;

  this.step = function(dt) {

    //Variable que nos permite controlar la velocidad de movimiento de la rana
    this.jumpTime -= dt;

    //Variables auxiliares que controlan si la rana se sale de los límites
    var auxX = this.x;
    var auxY = this.y;

    //Variable que controla si se puede ejecutar la animación
    var animation = false;

    //Movimientos
    if(Game.keys['left'] && this.jumpTime < 0) {
      auxX += -40;
      if(auxX > 0) {
        this.x += -40;
        this.jumpTime = this.jumpStep;
        this.animation = true;
      }
    }
    else if(Game.keys['right'] && this.jumpTime < 0) {
      auxX += 40;
      if(auxX < Game.width - this.w / 2) {
        this.x += 40;
        this.jumpTime = this.jumpStep;
        this.animation = true;
      }
    }
    else if(Game.keys['up'] && this.jumpTime < 0) {
      auxY += -48;
      if(auxY > 0) {
        this.y += -this.maxVel;
        this.jumpTime = this.jumpStep;
        this.animation = true;
      }
    }
    else if(Game.keys['down'] && this.jumpTime < 0) {
      auxY += 48;
      if(auxY < Game.height) {
        this.y += 48;
        this.jumpTime = this.jumpStep;
        this.animation = true;
      }
    }
    else { this.vx = 0; this.vy = 0; }

    if(this.animation) {
      this.frame = Math.floor(this.subFrame++ / 2);
      if(this.subFrame > 12) {
        this.subFrame = 0;
        this.animation = false;
      }
    }
  }
};

Frog.prototype = new Sprite();
Frog.prototype.type = OBJECT_PLAYER;