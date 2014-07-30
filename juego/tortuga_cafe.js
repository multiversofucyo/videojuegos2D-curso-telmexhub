//crear el grupo de animaciones para la tortuga verde
Q.animations("animacionesTortugaCafe",{
	caminar: {
		frames:[2, 4],
		rate: 1 / 2,
		loop: true
	},
	enConchar: {
		frames: [6, 5],
		rate: 1 / 4,
		loop: false
	}
});

Q.Sprite.extend("TortugaCafe",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesTortugaCafe",
			sheet: "tortugas",
			frame: 2,
			vx:120,
			//DEFINIMOS NUESTRAS PROPIEDADES
			esConcha: false,
			enemigo:true,
			z:1
		});
		
		this.add("2d, aiBounce, animation");
		
		this.play("caminar");
		//escucha el evento bump.top
		this.on("bump.top", this, "aConcha");
	},
	aConcha:function(colision){
		//Detectar si es mario el que le cayó encima
		if( colision.obj.isA("Jugador") ){
			//mario rebota
			colision.obj.p.vy = -500;
			//suena patada.mp3
			Q.audio.play("patada.mp3");
			
			//si la tortuga no es concha
			if( !this.p.esConcha ){
				//cambiar el sheet por el de enemigos bajos
				this.sheet("enemigosBajos", true);
				//activa la bandera esConcha
				this.p.esConcha = true;
			}
			
			//hacer que la tortuga se quede quieta cuando se esta moviendo
			if(this.p.vx != 0){
				this.p.vx = 0;
			}else{
			//hacer que la tortuga se mueva cuando esta quieta
				this.p.vx = 500;
			}
			
			
			//ejecutar la animacion enconchar
			this.play("enConchar");
		}
	},
	step: function(){
		//voltear cuando va a la derecha, vx+
		if(this.p.vx > 0){
			this.p.flip = "x";
		}
		
		//no voltear cuando va a la izquierda vx-
		if(this.p.vx < 0){
			this.p.flip = false;
		}
	}
});