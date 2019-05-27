package com.oboon.client.android;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.psykar.cookiemanager.CookieManagerPackage;

import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.polidea.reactnativeble.BlePackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.iamport.IamportPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oboon.client.android.BuildConfig;

import java.util.Arrays;
import java.util.List;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),

            new CookieManagerPackage(),
            new ImagePickerPackage(),
            new RNCWebViewPackage(),
            new BlePackage(),
            new RNSensitiveInfoPackage(),
            new RNFusedLocationPackage(),
            new IamportPackage(),
            new RNGoogleSigninPackage(),
            new RNGestureHandlerPackage(),
            new RNKakaoLoginsPackage(),
            new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }




  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    this.getHashKey();
  }

  private void getHashKey(){
    PackageInfo packageInfo = null;
    try {
      packageInfo = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
    if (packageInfo == null)
      Log.e("KeyHash", "KeyHash:null");

    for (Signature signature : packageInfo.signatures) {
      try {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        Log.d("KeyHash", Base64.encodeToString(md.digest(), Base64.DEFAULT));
      } catch (NoSuchAlgorithmException e) {
        Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
      }
    }
  }



}




