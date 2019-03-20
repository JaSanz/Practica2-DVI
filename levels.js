var level1 = [
  // Start,    End, Gap,  Type,   Enemy
   [ 0,  40000000, 3000, 'coche_azul', 0],
   [ 1,  13000000, 5000, 'coche_verde', 0 ],
   [ 2,  16000000, 2000, 'coche_amarillo', 0 ],
   [ 3,  20000000, 5000, 'camion_bomberos', 0 ],
   [ 4,  20000000, 5000, 'camion_grande', 0 ],
   [ 3,  16000000, 2000, 'tronco_pequeño', 1 ],
   [ 2,  20000000, 5000, 'tronco_mediano', 1 ],
   [ 1,  20000000, 5000, 'tronco_grande', 1 ],

   
 ];
 
 var Level = function(levelData,callback) {
   this.levelData = [];
   for(var i = 0; i < levelData.length; i++) {
     this.levelData.push(Object.create(levelData[i]));
   }
   this.t = 0;
   this.callback = callback;
 }
 
 Level.prototype.draw = function(ctx) { }
 
 Level.prototype.step = function(dt) {
   var idx = 0, remove = [], curShip = null;
  
  // Update the current time offset
   this.t += dt*1000;
 
   //  Example levelData 
   //   Start, End,  Gap, Type,   Override
   // [[ 0,     4000, 500, 'step', { x: 100 } ]
   while((curShip = this.levelData[idx]) && 
         (curShip[0] < this.t + 2000)) {
     // Check if past the end time 
     if(this.t > curShip[1]) {
       // If so, remove the entry
       remove.push(curShip);
     } else if(curShip[0] < this.t) {
       // Get the enemy definition blueprint
        if (curShip[4] == 0){
          var vehiculo = vehiculos[curShip[3]];
          this.board.add(new Vehiculo(vehiculo));
        }
        else if (curShip[4] == 1){
          var tronco = troncos[curShip[3]];
          this.board.add(new Tronco(tronco));
        }
 
       // Increment the start time by the gap
       curShip[0] += curShip[2];
     }
     idx++;
   }
   // Remove any objects from the levelData that have passed
   for(var i = 0, len = remove.length; i < len; i++) {
     var idx = this.levelData.indexOf(remove[i]);
     if(idx != -1) this.levelData.splice(idx,1);
   }
 
   // If there are no more enemies on the board or in 
   // levelData, this level is done
   //if(this.levelData.length == 0 && this.board.cnt[OBJECT_VEHICULO] == 0) {
    // if(this.callback) this.callback();
   //}
 }
