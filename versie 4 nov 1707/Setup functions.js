var aantalBeurten = 1000;
var faillietGaan = true;
var sets = [[1, 3], [6, 8, 9], [11, 13, 14], [16, 18, 19], [21, 23, 24], [26, 27, 29], [31, 32, 34], [37, 39], [5, 15, 25, 35], [12, 28]];

function logProgress(i, aantal, stap) {
	if((i*100/aantal)%stap == 0) {
		console.log("Voortgang " + i * 100 / aantal + "%");
	};
};

function makePlayer(num) {
	var player = {bank:1500, 
			cashPercentage: Math.random()*10, //Variabel tussen 0 en 10
			dubbelPogingen: 0,
			dubbelcount:0, 
			gevangenis: false, 
			houseInterest: 0.5, //Variabel tussen 0 en 1
			number: num, 
			place:0, 
			properties:[],
			setInterest: Math.random()*5, //Voor de eerste extra straat in set
			lastSetInterest: Math.random()*5, //Variabel tussen 0 en 5
			streetsInterest: [], //Array van variabelen tussen 0 en 2
			spelend: true
		};

	for(var i = 0; i < 40; i++) {
		player.properties[i] = false;
		player.streetsInterest[i] = Math.random()*2;
		// player.streetsInterest[i] = 1;
	}

	return player;

}

function makeGenePool(size) {
	var genePool = []; 

	var aantalGroepen = (size - (size % 4))/4
	genePoolSize = aantalGroepen * 4;
		
	for(var i = 0; i < genePoolSize; i++) {
		genePool.push(makePlayer(i % 4))
	};

	return genePool;
}



function setUpCarts() {
	var array = [];
	for(var i = 0; i < 16; i++) {
		array[i] = false;
	}
	return array;
}

function inputProperties(){
	var properties = {bought:[], prijs:[], huur:[], huis1:[], huis2:[], huis3:[], huis4:[], hotel:[], hypotheek:[], huiskosten:[], aantalHuizen:[]}
	
	function setupProperties(){
		for (var i = 0; i < 40; i++) {
			properties.bought[i] = "te koop"
			properties.prijs[i] = 0
			properties.huur[i] = [0, 0, 0, 0, 0, 0]
			properties.hypotheek[i] = 0
			properties.huiskosten[i] = 0
			properties.aantalHuizen[i] = 0
		}
	}
	setupProperties()

	properties.prijs[1] = 60
	properties.prijs[3] = 60
	properties.prijs[5] = 200
	properties.prijs[6] = 100
	properties.prijs[8] = 100
	properties.prijs[9] = 120
	properties.prijs[11] = 140
	properties.prijs[12] = 150
	properties.prijs[13] = 140
	properties.prijs[14] = 160
	properties.prijs[15] = 200
	properties.prijs[16] = 180
	properties.prijs[18] = 180
	properties.prijs[19] = 200
	properties.prijs[21] = 220
	properties.prijs[23] = 220
	properties.prijs[24] = 240
	properties.prijs[25] = 200
	properties.prijs[26] = 260
	properties.prijs[27] = 260
	properties.prijs[28] = 150 
	properties.prijs[29] = 280
	properties.prijs[31] = 300
	properties.prijs[32] = 300
	properties.prijs[34] = 320
	properties.prijs[35] = 200
	properties.prijs[37] = 350
	properties.prijs[39] = 400

	properties.huur[1] = [2, 10, 30, 90, 160, 250];
	properties.huur[3] = [4, 20, 60, 180, 320, 450];
	properties.huur[6] = [6, 30, 90, 270, 400, 550];
	properties.huur[8] = [6, 30, 90, 270, 400, 550];
	properties.huur[9] = [8, 40, 100, 300, 450, 600];
	properties.huur[11] = [10, 50, 150, 450, 625, 750]; 
	properties.huur[13] = [10, 50, 150, 450, 625, 750];
	properties.huur[14] = [12, 60, 180, 500, 700, 900];
	properties.huur[16] = [14, 70, 200, 550, 750, 950];
	properties.huur[18] = [14, 70, 200, 550, 750, 950];
	properties.huur[19] = [16, 80, 220, 600, 800, 1000];
	properties.huur[21] = [18, 90, 250, 700, 875, 1050];
	properties.huur[23] = [18, 90, 250, 700, 875, 1050];
	properties.huur[24] = [20, 100, 300, 750, 925, 1100];
	properties.huur[26] = [22, 110, 330, 800, 975, 1150];
	properties.huur[27] = [22, 110, 330, 800, 975, 1150];
	properties.huur[29] = [24, 120, 360, 850, 1025, 1200];
	properties.huur[31] = [26, 130, 390, 900, 1100, 1275];
	properties.huur[32] = [26, 130, 390, 900, 1100, 1275];
	properties.huur[34] = [28, 150, 450, 1000, 1200, 1400];
	properties.huur[37] = [35, 175, 500, 1100, 1300, 1500];
	properties.huur[39] = [50, 200, 600, 1400, 1700, 2000];


	properties.hypotheek[1] = 30
	properties.hypotheek[3] = 30
	properties.hypotheek[6] = 50
	properties.hypotheek[8] = 50
	properties.hypotheek[9] = 60
	properties.hypotheek[11] = 70
	properties.hypotheek[13] = 70
	properties.hypotheek[14] = 80
	properties.hypotheek[16] = 90
	properties.hypotheek[18] = 90
	properties.hypotheek[19] = 100
	properties.hypotheek[21] = 110
	properties.hypotheek[23] = 110
	properties.hypotheek[24] = 120
	properties.hypotheek[26] = 130
	properties.hypotheek[27] = 130
	properties.hypotheek[29] = 140
	properties.hypotheek[31] = 150
	properties.hypotheek[32] = 150
	properties.hypotheek[34] = 160
	properties.hypotheek[37] = 175
	properties.hypotheek[39] = 200

	properties.huiskosten[1] = 50
	properties.huiskosten[3] = 50
	properties.huiskosten[6] = 50
	properties.huiskosten[8] = 50
	properties.huiskosten[9] = 50
	properties.huiskosten[11] = 100
	properties.huiskosten[13] = 100
	properties.huiskosten[14] = 100
	properties.huiskosten[16] = 100
	properties.huiskosten[18] = 100
	properties.huiskosten[19] = 100
	properties.huiskosten[21] = 150
	properties.huiskosten[23] = 150
	properties.huiskosten[24] = 150
	properties.huiskosten[26] = 150
	properties.huiskosten[27] = 150
	properties.huiskosten[29] = 150
	properties.huiskosten[31] = 200
	properties.huiskosten[32] = 200
	properties.huiskosten[34] = 200
	properties.huiskosten[37] = 200
	properties.huiskosten[39] = 200
	
	return properties;
}


function logProgress(i, aantal, stap) {
	if((i*100/aantal)%stap == 0) {
		console.log("Voortgang " + i * 100 / aantal + "%");
	};
};

function getAverageSetInterest(genePool) {
	var sum = 0;
	for(var i = 0; i < genePool.length; i++) {
		sum += genePool[i].setInterest;
	}
	var average = sum / genePool.length;
	average = Math.round(average * 1000)/1000
	return average;
}

function getAverageLastSetInterest(genePool) {
	var sum = 0;
	for(var i = 0; i < genePool.length; i++) {
		sum += genePool[i].lastSetInterest;
	}
	var average = sum / genePool.length;
	average = Math.round(average * 1000)/1000
	return average;
}

function indexOfMax(arr) {
    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}


function getAverageStreetInterest(genePool, property) {
	var sum = 0;
	for(var i = 0; i < genePool.length; i++) {
		sum += genePool[i].streetsInterest[property];
	}
	var average = sum / genePool.length;
	average = Math.round(average * 1000)/1000
	return average;
}



