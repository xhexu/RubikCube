package com.ionic.im;

import org.apache.cordova.CordovaActivity;

import android.os.Bundle;

public class MainActivity extends CordovaActivity{
	
	private static MainActivity instance = null;
	
	public static MainActivity getInstance(){
		return instance;
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		loadUrl(launchUrl);
		instance = this;
	}

}
