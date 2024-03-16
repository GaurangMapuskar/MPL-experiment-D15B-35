import 'package:expt_6/signup.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
// import 'package:recipe_app/signup.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController emailcontroller = TextEditingController();
  TextEditingController passwordcontroller = TextEditingController();

  signIn() async {
    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: emailcontroller.text,
        password: passwordcontroller.text,
      );
      // Navigate to the next screen upon successful login
    } catch (e) {
      // Handle sign-in errors here
      print('Error signing in: $e');
      // Show a snackbar, toast, or dialog to inform the user of the error
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Login"),
        ),
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              TextField(
                controller: emailcontroller,
                decoration: const InputDecoration(hintText: 'Enter email'),
              ),
              TextField(
                controller: passwordcontroller,
                obscureText: true,
                decoration: const InputDecoration(hintText: 'Enter password'),
              ),
              ElevatedButton(onPressed: (() => signIn()), child: Text("Login")),
              SizedBox(
                height: 30,
              ),
              ElevatedButton(
                  onPressed: (() => Get.to(SignUp())),
                  child: Text("Register Now"))
            ],
          ),
        ));
  }
}
