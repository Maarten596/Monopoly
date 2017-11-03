function startEvolution() {
	var evolutieStappen = $("#aantalEvoluties")[0].value;
	var genePoolSize = $("#genepoolSize")[0].value;
	var potjesTotWinnaar = 1;
	
	var mutationRate = $("#mutationRate")[0].value;
	var maxMutationSize = $("#maxMutationSize")[0].value;

	var genePool = makeGenePool(genePoolSize);


	// In data wordt alle informatie van alle potjes en verschillende evolutie rondes opgeslagen
	// Plek 0 is voor occurrences
	// Plek 1 is voor gemiddelde streetsInterests na alle evolutiestappen
	// Plek 2 is voor gemiddelde setInterest over time
	// Plek 3 is voor gemiddelde lastSetInterest over time
	// Plek 4 is voor gemiddelde neude streetInterest over time
	var data = [];
	for(var i = 0; i < 5; i++) {
		data[i] = [];
	}
	
	for(var i = 0; i < 40; i++) {
		data[0][i] = 0;
	}

	var gelijkWin = [0, 0]

	//--------------------------------------
	for(var i = 0; i < evolutieStappen; i++) {
		console.log("evolutie stap: " + i)
		data[2][i] = getAverageSetInterest(genePool);
		data[3][i] = getAverageLastSetInterest(genePool);
		data[4][i] = getAverageStreetInterest(genePool, 16);
		genePool = playEvolution(genePool);
	}
	console.log("evolutie stap: " + i);
	//--------------------------------------

	for(var i = 0; i < 40; i++) {
		data[1][i] = getAverageStreetInterest(genePool, i);
	};


	function playEvolution(genePool) {
		var newGenePool = []; 
		for(var i = 0; i < genePool.length/4; i++) {
			var players = [];

			for(var j = 0; j < 4; j++) {
				players.push(genePool[i * 4 + j])
			}

			var leaderBord = [0,0,0,0] // i is speler 4 is gelijk

			for (var j = 0; j < potjesTotWinnaar; j++) {
				var gameData = playGame(players);
				var winnaar = gameData[0];
				// console.log(winnaar)
				if (winnaar == 'gelijk') {
					gelijkWin[1]++
					// leaderBord[4]++; 
				} else {
					gelijkWin[0]++
					leaderBord[winnaar]++;
				};
			
				for(var k = 0; k < 40; k++) {
					data[0][k] += gameData[1][k];
				}
			};

			// console.log(leaderBord);
			var maxIndex = indexOfMax(leaderBord);
			newGenePool.push(players[maxIndex]);
			
		}

		function growGenePool(genePool) {
			var newGenePool = [];
			
			function getPartner(num, length) {
				var partner = num; 
				while(partner == num) {
					partner = Math.floor(Math.random() * length);
				}
				return partner;
			};

			function makeChild(f, m) {
				function playerToDNA(player) {
					var DNA = []; 
					DNA.push(player.cashPercentage); 
					DNA.push(player.houseInterest); 
					DNA.push(player.setInterest); 
					DNA.push(player.lastSetInterest); 
					for(var i = 0; i < player.streetsInterest.length; i++) {
						DNA.push(player.streetsInterest[i]);
					}
					return DNA; 
				}

				var fDNA = playerToDNA(f);
				var mDNA = playerToDNA(m);
				var childDNA = [];

				for(var i = 0; i < fDNA.length; i++) {
					if(Math.random() >= 0.5) {
						childDNA.push(fDNA[i]);
					} else {
						childDNA.push(mDNA[i]);
					}; 
				};

				for(var i = 0; i < childDNA.length; i++) {
					var mutate = false; 
					if (mutationRate > Math.random()) {
						mutate = true;
					}

					if(mutate) {
						var mutationSize = maxMutationSize - 2*Math.random()*maxMutationSize;
						childDNA[i] += mutationSize;
					}

				}


				function DNAToPlayer(DNA) {
					var player = {
						bank:1500, 
						cashPercentage: DNA[0], //Variabel tussen 0 en 1
						dubbelPogingen: 0,
						dubbelcount:0, 
						gevangenis: false, 
						houseInterest: DNA[1], //Variabel tussen 0 en 1
						number: 0, 
						place:0, 
						properties:[],
						setInterest: DNA[2], //Voor de eerste extra straat in set
						lastSetInterest: DNA[3], //Variabel tussen 0 en 5
						streetsInterest: [], //Array van variabelen tussen 0 en 2
						spelend: true
					}

					for(var i = 4; i < DNA.length; i++) {
						player.streetsInterest.push(DNA[i]);
					};
					return player;
				}

				child = DNAToPlayer(childDNA);
				return child;
			};

			for(var i = 0; i < genePool.length; i++) {
				for(var j = 0; j < 4; j++) {
					var partner = getPartner(i, genePool.length); 
					newGenePool.push(makeChild(genePool[i], genePool[partner]));
				}
			};

			for(var i = 0; i < newGenePool.length; i++) {
				newGenePool[i].number = i % 4;
			}

			return newGenePool;
		}

		newGenePool = growGenePool(newGenePool);

		return newGenePool;
	}

	var sumOccurrences = 0;
	for(var i = 0; i < data[0].length; i++) {
		sumOccurrences += data[0][i];
	} 

	for(var i = 0; i < data[0].length; i++) {
		data[0][i] = Math.round((data[0][i] / sumOccurrences)*10000)/100;
	};


	outputData(data);
};



