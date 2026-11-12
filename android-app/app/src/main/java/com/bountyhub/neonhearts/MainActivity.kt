package com.bountyhub.neonhearts

import android.annotation.SuppressLint
import android.app.Activity
import android.graphics.Color
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback

class MainActivity : Activity() {
    private lateinit var gameView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.statusBarColor = Color.rgb(9, 10, 22)
        window.navigationBarColor = Color.rgb(9, 10, 22)

        gameView = WebView(this).apply {
            setBackgroundColor(Color.rgb(9, 10, 22))
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = true
            settings.allowContentAccess = false
            settings.javaScriptCanOpenWindowsAutomatically = false
            webViewClient = WebViewClient()
            webChromeClient = WebChromeClient()
            loadUrl("file:///android_asset/index.html")
        }
        setContentView(gameView)

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                gameView.evaluateJavascript(
                    "if (window.handleAndroidBack) window.handleAndroidBack();",
                    null
                )
            }
        })
    }

    override fun onDestroy() {
        if (::gameView.isInitialized) {
            gameView.apply {
                stopLoading()
                loadUrl("about:blank")
                destroy()
            }
        }
        super.onDestroy()
    }
}
