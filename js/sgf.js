/**
 * @license Go Board v1.0
 * Jao-Hui, Chang. lightman.chang@gmail.com
 * License: MIT
 */
 function sgf() {
	this.draw = function(draw, move, show_number){

		// canvas usage range
		var canvas = document.getElementById(draw);
		board_width = Math.min(canvas.width, canvas.height);
		board_block = Math.floor(board_width / this.SZ);
		board_width = board_block * (this.SZ - 1);
		board_start = (Math.min(canvas.width, canvas.height) - board_width) / 2;

		// board line
		var ctx = canvas.getContext("2d");
		ctx.textAlign = 'center';
		ctx.beginPath();
		for (x = 0; x < this.SZ; x++) {
			ctx.fillText(x + 1, board_start + x * board_block, board_start - Math.floor(board_block / 3));
			ctx.moveTo(board_start + x * board_block, board_start);
			ctx.lineTo(board_start + x * board_block, board_width + board_start);
			ctx.fillText(x + 1, board_start + board_width + Math.floor(board_block * 2 / 3), board_start + x * board_block + Math.floor(board_block / 3));
			ctx.moveTo(board_start, board_start + x * board_block);
			ctx.lineTo(board_width + board_start, board_start + x * board_block);
		}
		ctx.stroke();

		// board star points
		for (x = 3; x < this.SZ; x += (this.SZ - 1) / 2 - 3) {
			for (y = 3; y < this.SZ; y += (this.SZ - 1) / 2 - 3) {
				ctx.beginPath();
				ctx.arc(board_start + x * board_block, board_start + y * board_block, Math.ceil(board_block / 5), 0, 2 * Math.PI, false);
				ctx.fillStyle = 'black';
				ctx.fill();
			}
		}

		// stone
		move = (move == undefined) ? this.board.length : Math.min(this.board.length, move);
		show_number = (show_number == undefined) ? true : show_number;
		for (i = 0; i < move; i++) {
			ctx.beginPath();
			switch(this.board[i].stone) {
				case "W":
					ctx.arc(board_start + (this.board[i].x-1) * board_block, board_start + (this.board[i].y-1) * board_block, Math.ceil(board_block / 2)-1, 0, 2 * Math.PI, false);
					ctx.fillStyle = 'black';
					ctx.fill();
					ctx.fillStyle = 'white';
					break;
				case "B":
					ctx.arc(board_start + (this.board[i].x-1) * board_block, board_start + (this.board[i].y-1) * board_block, Math.ceil(board_block / 2)-1, 0, 2 * Math.PI, false);
					ctx.fillStyle = 'white';
					ctx.fill();
					ctx.strokeStyle = 'black';
					ctx.stroke();
					ctx.fillStyle = 'black';
					break;
			}
			if (show_number) {
				ctx.fillText(i + 1, board_start + (this.board[i].x-1) * board_block, board_start + (this.board[i].y-1) * board_block + Math.ceil(board_block / 7));
			}
		}
	};
	this.load = function(content){
		this.row = content;
		this.board = this.row.split(';')
			.map(function(n){
				var t = n.split(/[\[\!\]]+/);
				if (["B","W"].indexOf(t[0]) > -1) {
					var a = {};
					a.stone = t[0];
					a.x = parseInt(t[1].substr(0,1), 30);
					a.y = parseInt(t[1].substr(1,1), 30);
					a.x -= (a.x > 18) ? 10 : 9;
					a.y -= (a.y > 18) ? 10 : 9;
					if (a.x > 18) { a.x -= 10;}
					return a;
				}
			})
			.filter(function(n){return n != undefined;});
		t = this.row.split(';')[1].split(/[\[\!\]]+/);
		for (i=0; i<t.length-1; i+=2) {
			this[t[i]] = t[i+1];
		}
		if (this.SZ == undefined) { this.SZ = 19;}
	};
}
