//
//  PinScreenView.swift
//  MiwalletNativeSwift
//
//  Created by Elizabeth Delgado on 9/3/24.
//

//import Foundation
//import LocalAuthentication
//import React
//
//@objc(PinScreenView)
//class PinScreenView: NSObject {
//  
//  @objc
//  func authenticateWithTouchID(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
//    let context = LAContext()
//    var error: NSError?
//
//    // Check if Touch ID/Face ID is available
//    if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
//      let reason = "Authenticate with Touch ID/Face ID"
//
//      context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) { success, authenticationError in
//        DispatchQueue.main.async {
//          if success {
//            resolver(true) // Authentication successful
//          } else {
//            rejecter("AUTH_FAILED", "Authentication failed", authenticationError)
//          }
//        }
//      }
//    } else {
//      rejecter("BIOMETRICS_UNAVAILABLE", "Touch ID/Face ID is not available", error)
//    }
//  }
//  
//  @objc
//  static func requiresMainQueueSetup() -> Bool {
//    return true
//  }
//}


import Foundation

@objc(PinScreenView)
class PinScreenView: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func verifyPin(_ pin: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let isValid = (pin == "123456") // Example validation
    
    if isValid {
      resolve(true)
    } else {
      reject("PIN_ERROR", "Incorrect PIN", nil)
    }
  }
}
