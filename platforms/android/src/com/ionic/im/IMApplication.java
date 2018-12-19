package com.ionic.im;

import java.io.IOException;

import android.app.Application;
import android.content.Context;
import android.graphics.Color;
import android.os.Environment;
import android.text.TextUtils;

public class IMApplication extends Application{

	private static Application instance = null;
	public static Context mContext;  
	
	public static Application getInstance(){
		return instance;
	}
	
	@Override
	public void onCreate() {
		// TODO Auto-generated method stub
		super.onCreate();
		instance = this;
		mContext = getApplicationContext(); 
	}
}
