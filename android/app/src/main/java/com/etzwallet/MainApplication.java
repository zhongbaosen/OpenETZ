package com.etzwallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.beefe.picker.PickerViewPackage;

import com.reactnativenavigation.NavigationApplication;

import com.bitgo.randombytes.RandomBytesPackage;
import org.reactnative.camera.RNCameraPackage;
public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
          new PickerViewPackage(),
          new RandomBytesPackage(),
          new RNCameraPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
    @Override
     public void onCreate() {
       super.onCreate();
       SoLoader.init(this, /* native exopackage */ false);
     }
    @Override
    public String getJSMainModuleName() {
        return "index";
    }

}

// public class MainApplication extends Application implements ReactApplication {
//
//   private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//     @Override
//     public boolean getUseDeveloperSupport() {
//       return BuildConfig.DEBUG;
//     }
//
//     @Override
//     protected List<ReactPackage> getPackages() {
//       return Arrays.<ReactPackage>asList(
//           new MainReactPackage(),
            //new RNCameraPackage()
//       );
//     }
//
//     @Override
//     protected String getJSMainModuleName() {
//       return "index";
//     }
//   };
//
//   @Override
//   public ReactNativeHost getReactNativeHost() {
//     return mReactNativeHost;
//   }
//
//
// }
