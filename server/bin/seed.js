const mongoose = require('mongoose')
const Meeting = require('../models/meeting.model')


mongoose.connect('mongodb+srv://davila795:calanha14@cluster0.8dgyw.mongodb.net/test')            // Cambiar por literal

Meeting.collection.drop()

const data = [
    {
        "_id": "5fda6ed922098d47c327493a",
        "title": "Mouse Nebraska Avon",
        "date": "2021-07-18T13:02:24.181Z",
        "time": 1608150745287,
        "description": "Suriname program Frozen hacking drive Future Music invoice Open-source Generic Somoni markets card Dynamic microchip interactive cross-platform Fresh iterate product"
    },
    {
        "_id": "5fda6ed922098d47c327493b",
        "title": "Account Creative Iraqi",
        "date": "2021-01-16T01:34:10.800Z",
        "time": 1608150745288,
        "description": "SSL Parks Market synergies Metal Plains calculating optical Gateway generate Health invoice Checking Table port fuchsia next-generation Avon calculating Pennsylvania"
    },
    {
        "_id": "5fda6ed922098d47c327493c",
        "title": "invoice Games Bike",
        "date": "2021-11-13T21:10:52.788Z",
        "time": 1608150745289,
        "description": "Drives knowledge Cambridgeshire interactive payment Account Home payment open-source Points Spur circuit payment markets parsing deposit Chicken dot-com open-source solid"
    },
    {
        "_id": "5fda6ed922098d47c327493d",
        "title": "Car Administrator multimedia",
        "date": "2021-05-05T23:17:58.152Z",
        "time": 1608150745289,
        "description": "Lodge York interface firewall Malagasy function HDD magenta Cheese synthesize indexing SDD port calculate array alarm calculating Soft Frozen transmit"
    },
    {
        "_id": "5fda6ed922098d47c327493e",
        "title": "Plastic Investment virtual",
        "date": "2021-07-18T13:25:06.681Z",
        "time": 1608150745290,
        "description": "Assistant Lithuania Jewelery Computer green Guinea-Bissau microchip Kansas XSS Bedfordshire Face Fish hardware Account solid SDD Account International Small maroon"
    },
    {
        "_id": "5fda6ed922098d47c327493f",
        "title": "Tactics Zealand Steel",
        "date": "2021-07-02T07:33:47.881Z",
        "time": 1608150745290,
        "description": "frictionless utilize Web Home HTTP e-markets National Corner IB Bedfordshire primary disintermediate Carolina Fresh real-time copying web Cambridgeshire parse applications"
    },
    {
        "_id": "5fda6ed922098d47c3274940",
        "title": "Norfolk withdrawal leverage",
        "date": "2021-09-06T01:37:31.187Z",
        "time": 1608150745291,
        "description": "monitor Bedfordshire Tuna synergies concept Denmark Infrastructure deposit Practical Infrastructure Licensed Card Personal Bouvet collaborative Assimilated Shilling programming framework payment"
    },
    {
        "_id": "5fda6ed922098d47c3274941",
        "title": "Account Louisiana generation",
        "date": "2021-10-14T02:52:44.943Z",
        "time": 1608150745291,
        "description": "Customer supply-chains Plastic Ports Fish Kina green Generic Handcrafted Chair Outdoors program Optimized Accounts Investor even-keeled quantify Fantastic Lesotho Liaison"
    },
    {
        "_id": "5fda6ed922098d47c3274942",
        "title": "Principal Account Cotton",
        "date": "2021-03-30T20:29:24.832Z",
        "time": 1608150745291,
        "description": "visualize Berkshire Salad Stand-alone Buckinghamshire generate mobile CSS grey capacitor channels wireless grow cross-platform Lead cohesive driver Ergonomic Dollar synergy"
    },
    {
        "_id": "5fda6ed922098d47c3274943",
        "title": "Organic supply-chains Beauty",
        "date": "2021-02-27T00:56:52.064Z",
        "time": 1608150745292,
        "description": "plum feed navigate Myanmar Crest TCP Table CSS Mayotte Mountain monitor 24/7 FTP Sharable Computers Engineer Lead product Loan Computer"
    },
    {
        "_id": "5fda6ed922098d47c3274944",
        "title": "pixel Fords interface",
        "date": "2021-11-15T18:56:26.987Z",
        "time": 1608150745292,
        "description": "withdrawal monitor Licensed Licensed Fork calculate Paradigm Program Clothing Southern Computer productivity solutions Israel deposit product Multi-lateral repurpose deposit payment"
    },
    {
        "_id": "5fda6ed922098d47c3274945",
        "title": "Naira solutions Incredible",
        "date": "2021-11-14T15:22:05.211Z",
        "time": 1608150745293,
        "description": "Card Cross-group Fantastic Rubber Developer projection Account Account hour Human Marshall TCP Sudan infrastructure Assistant Berkshire Generic Avon Bike extensible"
    },
    {
        "_id": "5fda6ed922098d47c3274946",
        "title": "e-services human-resource Iowa",
        "date": "2021-07-04T23:01:52.393Z",
        "time": 1608150745293,
        "description": "Auto Mouse Fish Shoal reciprocal Salad Awesome virtual reboot AGP software Home deposit Berkshire Bedfordshire Frozen input web Consultant override"
    },
    {
        "_id": "5fda6ed922098d47c3274947",
        "title": "Awesome bandwidth system",
        "date": "2021-01-16T08:30:43.198Z",
        "time": 1608150745294,
        "description": "compress grey gold Bacon program Groves United infrastructures Refined Fundamental Proactive Practical Forward parse Coordinator South PNG firewall world-class Neck"
    },
    {
        "_id": "5fda6ed922098d47c3274948",
        "title": "Dollar Nevada Shoes",
        "date": "2021-01-19T06:45:31.742Z",
        "time": 1608150745294,
        "description": "Bike Plastic Granite index transmitting user-facing Avon haptic benchmark Keyboard Unbranded bluetooth Quality National solution Senior multi-byte eyeballs Lari override"
    },
    {
        "_id": "5fda6ed922098d47c3274949",
        "title": "Street program 1080p",
        "date": "2021-05-10T13:01:55.986Z",
        "time": 1608150745294,
        "description": "Senegal Dynamic Nakfa Shoes efficient e-business Cambridgeshire Granite Vision-oriented Borders Boliviano benchmark Unbranded card Mauritius quantify Sahara Tasty Plastic Lead"
    },
    {
        "_id": "5fda6ed922098d47c327494a",
        "title": "superstructure Dollar generation",
        "date": "2021-11-05T04:09:46.380Z",
        "time": 1608150745295,
        "description": "infrastructures Programmable infrastructure Universal withdrawal Peso Gorgeous bluetooth Gorgeous synthesizing De-engineered Frozen monetize Market COM panel distributed Plastic Kwanza Supervisor"
    },
    {
        "_id": "5fda6ed922098d47c327494b",
        "title": "override Pants Montana",
        "date": "2021-05-23T13:14:25.920Z",
        "time": 1608150745295,
        "description": "Avon Tasty bricks-and-clicks Trafficway turn-key salmon Mouse Mississippi Republic Checking override Division connecting Hollow haptic channels deposit Focused Alabama Creative"
    },
    {
        "_id": "5fda6ed922098d47c327494c",
        "title": "compress holistic customized",
        "date": "2021-10-25T06:56:44.674Z",
        "time": 1608150745296,
        "description": "deposit Dale Fresh even-keeled Accountability Dong Checking port Handmade deposit black New Computer Intelligent bottom-line Cambridgeshire cyan bifurcated firewall Tennessee"
    },
    {
        "_id": "5fda6ed922098d47c327494d",
        "title": "Handmade Avon Awesome",
        "date": "2021-07-14T14:13:30.167Z",
        "time": 1608150745296,
        "description": "one-to-one portal Designer Function-based Berkshire Personal calculate monitor Tuna Clothing Implemented e-business Liaison Implementation demand-driven frictionless Shirt Movies Metal Forward"
    },
    {
        "_id": "5fda6ed922098d47c327494e",
        "title": "granular proactive Principal",
        "date": "2021-07-24T05:44:33.054Z",
        "time": 1608150745297,
        "description": "open-source envisioneer Customer Table Bedfordshire connecting calculating payment Human Pines Senior utilize Ranch Generic application driver cross-platform Pine real-time Russian"
    }
]

Meeting
    .create(data)
    .then(eventsCreated => { console.log('CREATED:', eventsCreated.length, 'events'); mongoose.connection.close() })
    .catch(err => console.log(err))