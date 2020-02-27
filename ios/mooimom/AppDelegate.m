/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
//#import "Firebase.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <UserNotifications/UserNotifications.h>
#import "QGSdk.h"



@interface AppDelegate() <UNUserNotificationCenterDelegate>
@end


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSLog(@"My token is: %@", deviceToken);
  [[QGSdk getSharedInstance] setToken:deviceToken];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  NSLog(@"Failed to get token, error: %@", error.localizedDescription);
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  QGSdk *qgsdk = [QGSdk getSharedInstance];

  
//  [FIRApp configure];
//  [FIRMessaging messaging].delegate = self;
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"mooimom"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  #ifdef DEBUG
    [qgsdk onStart:@"your aiqua appid" withAppGroup:@"group.com.company.product.notification" setDevProfile:true];
  #else
    [qgsdk onStart:@"your aiqua appid" withAppGroup:@"group.com.company.product.notification" setDevProfile:false];
  #endif
  
  if (@available(iOS 10.0, *)) {
    UNAuthorizationOptions options = (UNAuthorizationOptions) (UNAuthorizationOptionAlert | UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionCarPlay);
    if (@available(iOS 12.0, *)) {
      if (![qgsdk getShowPushPrompt]) {
        //add provisional for silent push in notification center without push prompt
        options = options | UNAuthorizationOptionProvisional;
      }
    }

    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
    [center requestAuthorizationWithOptions:options completionHandler:^(BOOL granted, NSError *error){
      NSLog(@"GRANTED: %i, Error: %@", granted, error);
    }];
  } else {
    // Fallback on earlier versions - iOS 8 & 9
    UIUserNotificationType types = UIUserNotificationTypeAlert | UIUserNotificationTypeSound |
    UIUserNotificationTypeBadge;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  }
  return YES;
}

@end
