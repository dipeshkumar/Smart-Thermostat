package com.example.rupesh.thermostat;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    EditText et;
    String ip;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void doSomething(View v){
        Intent i = new Intent(MainActivity.this,AppView.class);
        et = (EditText)findViewById(R.id.ip);
        ip = et.getText().toString();
        i.putExtra("IP",ip);
        startActivity(i);
    }
}
