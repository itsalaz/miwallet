//
//  PinScreenView.m
//  MiwalletNativeSwift
//
//  Created by Elizabeth Delgado on 9/3/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(PinScreenView, NSObject)

RCT_EXTERN_METHOD(verifyPin:(NSString *)pin
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejector:(RCTPromiseRejectBlock)reject)

@end
