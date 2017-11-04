function playGame(players) {
	var beurtenOver = aantalBeurten;
	var occurrences = [];
	var pot = 0;
	var inGame = 4;

	
	

	for (var i = 0; i < 40; i++) {
		occurrences[i] = 0;
	};


	//voegt van alle straten de prijzen en status toe
	var properties = inputProperties()
	
	//creert de stapels van kaarten
	var kanskaarten = setUpCarts();
	var algemeenfonds = setUpCarts();

	

	//Geeft elke speler een aantalBeurten en logt ondertussen de voortgang	
	while(inGame > 1) {
		for (var j = 0; j < players.length; j++) {
			if (players[j].spelend && inGame > 1) {
				beurt(players[j]); 
			}
		};
		beurtenOver--;
		if (beurtenOver < 0) {
			break;
		}
	};


	var toReturn = [];
	if (inGame > 1) {
		toReturn.push("gelijk");
	} else {
		var winnaar = 0;
		for(var i = 0; i < players.length; i++) {
			if (players[i].spelend) {
				winnaar = players[i].number;
			}
		}
		toReturn.push(winnaar); 
	}

	function resetPlayers() {
		for(var i = 0; i < players.length; i++) {
			players[i].bank = 1500;
			players[i].dubbelcount = 0;
			players[i].dubbelPogingen = 0;
			players[i].gevangenis = false;
			players[i].place = 0;
			for(var j = 0; j < players[i].properties.length; j++) {
				players[i].properties[j] = false;
			}
			players[i].spelend = true;
		}
	}
	resetPlayers()

	toReturn.push(occurrences);

	return toReturn;



	function beurt(player){
		if (player.gevangenis) {
			var a = Math.round(Math.random()*6+0.5);
			var b = Math.round(Math.random()*6+0.5);
			if (a == b) {
				player.gevangenis = false;
				player.dubbelPogingen = 0;
			} else {
				player.dubbelPogingen += 1;
				occurrences[player.place] += 1;
			};
			if (player.dubbelPogingen > 2) {
				player.bank -= 50;
				pot += 50;
				player.dubbelPogingen = 0;
				player.gevangenis = false; 
			};
		};
		if (!player.gevangenis) {
			//dobbelstenen	
			var x = Math.round(Math.random()*6+0.5);
			var y = Math.round(Math.random()*6+0.5);
			var z = x + y;
			player.place += z;

			//als er dubbel is gegooid
			if (x == y) {
				player.dubbelcount += 1
				//als er drie keer dubbel is gegooid
				if (player.dubbelcount > 2) { 
					player.place = 10;
					player.dubbelcount = 0;
					player.gevangenis = true;
				};
			} else if (x != y) {
				player.dubbelcount = 0;
			}

			//als er rond het bord is gegaan -40
			if (player.place > 39) { 
				player.place -= 40
				player.bank += 200
			}

			//kanskaarten
			if (player.place == 7 || player.place == 22 || player.place == 36) {
				var kaartNummer = trekKaart(kanskaarten)
				if(kaartNummer == 0){
					player.bank -= 15
				} else if (kaartNummer == 1) {
					player.bank -= 150
				} else if (kaartNummer == 2) {
					if (player.place > 11) {
						player.bank += 200
					} 
					player.place = 11
				} else if (kaartNummer == 3) {
					if (player.place > 15) {
						player.bank += 200
					}
					player.place = 15
				} else if (kaartNummer == 4) {
					player.place = 0
					player.bank += 200
				} else if (kaartNummer == 5) {
					player.place -= 3
				} else if (kaartNummer == 6) {
					player.place = 10;
					player.gevangenis = true;
				} else if (kaartNummer == 7) {
					if (player.place > 24) {
						player.bank += 200
					}
					player.place = 24
				} else if (kaartNummer == 8) {
					player.bank -= 50
				} else if (kaartNummer == 9) {
					//verlaat de gevangenis zonder te betalen
				} else if (kaartNummer == 10) {
					//betaal voor elk huis 25 en hotel 100
				} else if (kaartNummer == 11) {
					//betaal voor elk huis 40 en hotel 115
				} else if (kaartNummer == 12) {
					player.bank += 150
				} else if (kaartNummer == 13) {
					player.bank -= 20
				} else if (kaartNummer == 14) {
					player.place = 39
				} else if (kaartNummer == 15) {
					player.bank += 100
				}
			} 
			//algemeenfonds
			if (player.place == 2 || player.place == 17 || player.place == 33) {
				var kaartNummer = trekKaart(algemeenfonds)
				if (kaartNummer == 0) {
					player.bank += 100
				} else if (kaartNummer == 1) {
					player.bank += 25
				} else if (kaartNummer == 2) {
					player.bank += 200
				} else if(kaartNummer == 3) {
					player.place = 1
				} else if (kaartNummer == 4) {
					player.place = 10
					player.gevangenis = true;
				} else if (kaartNummer == 5) {
					for(var i = 0; i < players.length; i++) {
						if (players[i].number != player.number && players[i].spelend) {
							players[i].bank -= 10; 
							player.bank += 10;
						}
					}
					//ontvangt van iedere speler 10
				} else if (kaartNummer == 6) {
					player.bank += 10
				} else if (kaartNummer == 7) {
					player.bank -= 50
				} else if (kaartNummer == 8) {
					player.bank -= 50
				} else if (kaartNummer == 9) {
					player.bank += 50
				} else if (kaartNummer == 10) {
					//verlaat de gevangenis zonder te betalen
				} else if (kaartNummer == 11) {
					player.bank += 20
				} else if (kaartNummer == 12) {
					player.bank += 100
				} else if (kaartNummer == 13) {
					player.bank -= 100
				} else if (kaartNummer == 14) {
					player.place = 0
					player.bank +=200
				} else if (kaartNummer == 15) {
					//betaal 10 boete of pak een kanskaart
				} 
			} 
			//ga direct naar gevangenis
			if (player.place == 30) {
				player.place = 10
				player.gevangenis = true;
			} 
			//belasting 1
			if (player.place == 4) {
				player.bank -= 200;
				pot += 200;
			} 
			//belasting 2
			if (player.place == 38) {
				player.bank -= 100;
				pot += 100;
			}
			//vrij parkeren
			if (player.place == 20) {
				player.bank += pot;
				pot = 0;
			};
			//Gevangenis (slechts op bezoek)
			if (player.place == 10) {
			};
			//Start
			if (player.place == 0) {
				player.bank += 200;
			};

			if (player.bank < 0) {
				spelerFailliet(player, "bank");
			}

			//Gewone straten
			var straatNummers = [1, 3, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 21, 23, 24, 25, 26, 27, 28, 29, 31, 32, 34, 35, 37, 39];
			var stationNummers = [5, 15, 25, 35];
			
			function checkIfStation(num) {
				for(var i = 0; i < stationNummers.length; i++) {
					if (stationNummers[i] == num) {
						return true;
					}
				}
				return false;
			}

			// Wordt de huur bepaalt van de straten waar het afhankelijk is van de worp of bezit
			if(checkIfStation(player.place)) {
				var count = 0;
				for(var i = 0; i < stationNummers.length; i++) {
					if(player.number == properties.bought[stationNummers[i]]) {
						count++;
					}
				}
				if(count == 1) {
					properties.huur[player.place][0] = 25;
				} else if (count == 2) {
					properties.huur[player.place][0] = 50;
				} else if (count == 3) {
					properties.huur[player.place][0] = 100;
				} else if (count == 4) {
					properties.huur[player.place][0] = 200;
				}
			}

			if (player.place == 28) {
				if (properties.bought[12] == properties.bought[28]) {
					properties.huur[28][0] = 10*(x + y);
				} else {
					properties.huur[28][0] = 4*(x + y);
				}
			} else if (player.place == 12) {
				if (properties.bought[12] == properties.bought[28]) {
					properties.huur[12][0] = 10*(x + y);
				} else {
					properties.huur[12][0] = 4*(x + y);
				}
			}; 


			function checkIfStreet(num) {
				for(var i = 0; i < straatNummers.length; i++) {
					if (straatNummers[i] == num) {
						return true;
					}
				}
			}

			// Als de plaats een straat is wordt de functie checkPropertie aangeroepen
			if(checkIfStreet(player.place)) {
				checkProperty(player, player.place);
			}

			checkHuisKopen(player);
			checkSellProperty();


			occurrences[player.place] += 1 //voegt het nummer toe aan de array
						
			if (x == y) {
				if (player.spelend) {
					beurt(player);
				}
			};
		};
	};

	//	Wanneer iemand op een straat landt
	//----------------------------------------
	function checkProperty(player, property) {
		if (properties.bought[property] == "te koop") {
			if (wilKopen(player, property)) {
				buyProperty(player, property, properties.prijs[property]);
			} else {
				biedenProperty(property);
			}
		} else {
			payRent(player, property)
		}
	};

	function wilKopen(player, property) { //Wil hij hem ook kopen? Hangt af van variabelen die mee gegeven zijn.
        function kanKopen(player, property) {
			var cashInKas = getCashInKas(player, property)
			if (cashInKas >= player.bank - properties.prijs[property]) {
				return true
			} else {
				return false
			};
		};
        if(kanKopen(player, property)) {
        	var multiplier = getSetInterest(player, property);
        	var spelerWaarde = properties.prijs[property] * player.streetsInterest[property] * multiplier;
        	if (player.streetsInterest[property] * multiplier >= 1) {
        		return true;
        	} else {
        		return false;
        	}
        } else {
        	return false; 
        };
    };

	function getCashInKas(player, property) {	
		var eigenaar = properties.bought[property];
		var kansPlek = [0.0285, 0.02422, 0.01606, 0.02029, 0.02194, 0.02084, 0.02147, 0.01204, 0.02173, 0.02134, 0.13583, 0.02484, 0.02104, 0.02192, 0.02277, 0.0287, 0.02575, 0.02218, 0.02712, 0.02824, 0.02634, 0.02597, 0.01412, 0.02503, 0.02936, 0.02515, 0.02514, 0.02489, 0.02448, 0.02421, 0, 0.02464, 0.02395, 0.01993, 0.02273, 0.02194, 0.01155, 0.01981, 0.01984, 0.02408]
		var uitgavesPerBeurt = [0.672, 0.672, 0.672, 0.672]
		
		function uitgavePerBeurt(player, property) {
			for(var j = 0; j < 4; j++) {
				for(var i = 0; i < 40; i++) {
					if (properties.bought[i] != j && properties.bought[i] != "te koop") {
						uitgavesPerBeurt[j] += properties.huur[i] * kansPlek[i]
					};
				};
			};
			return uitgavesPerBeurt
		};
		
		function maakCashInKas (player) {
			var uitgavesPerBeurt = uitgavePerBeurt(player, property)
			var cashInKas = uitgavesPerBeurt[player] * player.cashPercentage
			return cashInKas
		};
		var cashInKas = maakCashInKas (player)
		return cashInKas
	};
	
    function getSetInterest(player, property) {
    	var setNum;
    	for(var i = 0; i < sets.length; i++) {
    		for(var j = 0; j < sets[i].length; j++) {
    			if (sets[i][j] == property) {
    				setNum = i;
    			}
    		}
    	}
    	var benodigd = 0;
    	for(var i = 0; i < sets[setNum].length; i++) {
    		if(properties.bought[sets[setNum][i]] != player.number) {
    			benodigd++;
    		}
    	}
    	if (benodigd == 0) {
    		return 1;
    	} else if (benodigd > 1) {
    		return player.setInterest;
    	} else {
    		return player.lastSetInterest;
    	};
    };
    
	function buyProperty(player, property, price) {
		player.bank -= price;
		properties.bought[property] = player.number;
		player.properties[property] = true
	};

	function biedenProperty(property) {
		// Vickrey auction
		var geboden = [];
		for(var i = 0; i < 4; i++) {
			var setInterest = getSetInterest(players[i], property);
			var streetInterest = players[i].streetsInterest[property];
			geboden.push(setInterest*streetInterest);
		}
		var winnaar = indexOfMax(geboden);
		var prijs = geboden[winnaar]*properties.prijs[property];
		buyProperty(players[winnaar], property, prijs);
	};

	function payRent(player, property) { //payRent is nu afhankelijk van hoeveel huizen er staan
		var aantalHuizen = properties.aantalHuizen[property];
		var huur = properties.huur[property][aantalHuizen];
		var eigenaar = properties.bought[property];
		var completeSets = checkCompleteSets(eigenaar)
		if (eigenaar != player.number && aantalHuizen == 0 && completeSets) {
			if(2 * huur > player.bank) {
				spelerFailliet(player, eigenaar); 
			} else {
				player.bank -= 2 * huur; 
				players[eigenaar].bank += 2 * huur;
			};	
		} else if (eigenaar != player.number) {
			if(huur > player.bank) {
				spelerFailliet(player, eigenaar); 
			} else {
				player.bank -= huur; 
				players[eigenaar].bank += huur;
			};	
		};
	};
	//----------------------------------------




	//	Huizen kopen
	//----------------------------------------
	function checkHuisKopen(player) {
		var completeSets = checkCompleteSets(player);
		for (var i = 0; i < completeSets.length; i++) {
			if(wilHuisKopen(player, completeSets[i])) {
				koopHuis(player, completeSets[i]);
			};
		};
	};

	function wilHuisKopen(player, set) { //wil hij hem kopen? hier moet nog een variabele in van hoe de tactiek is
		function kanHuisKopen(player, set) {
			var prijsHuis = properties.huiskosten[sets[set][0]]; //Huisprijs is voor elke straat in set gelijk
			var cashInKas = getCashInKas(player, property) 
			if (cashInKas >= player.bank - prijsHuis) {
				return true;
			} else {
				return false;
			}
		};
		if (kanHuisKopen(player, set)) {
			return true;
		} else {
			return false;
		}
	};
	
	function koopHuis(player, set) {
		var straat = "geen";
		var laagstAantalHuizen = properties.aantalHuizen[sets[set][0]];
		for(var i = 0; i < sets[set].length; i++) {
			if (properties.aantalHuizen[sets[set][i]] < 5) {
				if(properties.aantalHuizen[sets[set][i]] <= laagstAantalHuizen) {
					laagstAantalHuizen = properties.aantalHuizen[sets[set][i]];
					straat = sets[set][i];
				};
			}; 
		};
		if (straat != "geen") {
			player.bank -= properties.huiskosten[straat];
			properties.aantalHuizen[straat] += 1;
		}
	}

	function checkCompleteSets(player) {
		var completeSets = []; 
		for(var i = 0; i < sets.length - 2; i++) { // min 2 omdat de laatste twee geen huizen kunnen hebben
			var complete = true;
			for(var j = 0; j < sets[i].length; j++) {
				if (properties.bought[sets[i][j]] != player.number) {
					complete = false;
				}
			}
			if (complete) {
				completeSets.push(i);
			}
		}
		return completeSets;
	}
	//----------------------------------------
	

	//	Grond verkopen
	//----------------------------------------
	function checkSellProperty(player) {

	}
	//----------------------------------------




	// Speler failliet
	//----------------------------------------
	function spelerFailliet(player, eiser) {
		if (eiser != "bank") {
			players[eiser].bank += player.bank;

		}

		for(var i = 0; i < player.properties.length; i++) {
			player.properties[i] = false;
			// console.log(player.number);
			if (properties.bought[i] == player.number && eiser != "bank") {
				properties.bought[i] = eiser;
				players[eiser].properties[i] = true;
				var aantalHuizen = properties.aantalHuizen[i];
				var huisPrijs = properties.huiskosten[i];
				players[eiser].bank += aantalHuizen * huisPrijs * 0.5;
			} else if (properties.bought[i] == player.number) {
				properties.bought[i] = "te koop"
			}
		}
 

		inGame--;
		player.spelend = false;
		player.bank = 0;
	};
	//----------------------------------------





	function trekKaart(kaarten){  // functie om kaart te trekken uit stapels kanskaarten of algemeenfonds
		var found = false;
		for (var i = 0; i < 16; i++) {
			var a = Math.round(Math.random()*15); //random nummer tussen 0-15
			if (kaarten[a] == false) {
				kaarten[a] = true
				found = true;
				break;
			};
		};
		if (found) {
			return a	
		} else {
			for (var i = 0; i < 16; i++) {
				kaarten[i] = false
			}
			var a = Math.round(Math.random()*15) //random nummer tussen 0-15
			return a;
		}
	};


	//Zorgt voor een visueel beeld van wat er is gebeurt.
	function displayOutput() {
		var occurrencesTotaal = 0;
		for (var i = 0; i < occurrences.length; i++) {
			occurrencesTotaal += occurrences[i];
		}
		console.log(occurrencesTotaal); 

		var kansPlek = []
		for (var i = 0; i < occurrences.length; i++) {
			kansPlek[i] = Math.round(10000 * occurrences[i]/occurrencesTotaal)/100;
		}
		
		
		var occurrencesString = "";
		for(var i = 0; i < kansPlek.length; i++) {
			occurrencesString += "<li>" + "Straat: " + i + "<br>" + kansPlek[i] + "%" + "</li>"; 
		};
		document.getElementById("demo").innerHTML = occurrencesString;
	};
	// displayOutput()
};
