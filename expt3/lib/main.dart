import 'package:flutter/material.dart';

void main() {
  runApp(AlphabetApp());
}

class AlphabetApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Alphabet Learning App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: AlphabetScreen(),
    );
  }
}

class AlphabetScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Alphabet Learning App'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.settings), // Add the Icon widget here
            onPressed: () {
              // Handle settings button press
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                AlphabetCard(
                  letter: 'A',
                  imagePath: 'assets/a.png',
                ),
                AlphabetCard(
                  letter: 'B',
                  imagePath: 'assets/b.png',
                ),
                // Add more AlphabetCards for other letters
              ],
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                print("Button is clicked");
              },
              child: const Text(
                'Next',
                style: TextStyle(
                  // fontFamily: 'Schyler',
                  fontSize: 40,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class AlphabetCard extends StatelessWidget {
  final String letter;
  final String imagePath;

  AlphabetCard({required this.letter, required this.imagePath});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset(
            imagePath,
            width: 100,
            height: 100,
          ),
          SizedBox(height: 10),
          Text(
            letter,
            style: TextStyle(fontSize: 24),
          ),
        ],
      ),
    );
  }
}
