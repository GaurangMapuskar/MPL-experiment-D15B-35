import 'package:expt_6/home.dart';
import 'package:expt_6/login.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
// import 'package:recipe_app/home.dart';
// import 'package:recipe_app/login.dart';
class Wrapper extends StatefulWidget {
  const Wrapper({super.key});

  @override
  State<Wrapper> createState() => _WrapperState();
}

class _WrapperState extends State<Wrapper> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder(stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context,snapshot){
        if (snapshot.hasData){
          return HomePage();
        }
        else{
          return const Login();
        }
      }),
    );
  }
}