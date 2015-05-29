#pragma strict
//
//@script ExecuteInEditMode() //--makes this bit work without having to click play

var showLevels : boolean  = false;

private var btnWidth = 200;
private var btnHeight = 40; 
private var btnVerticalPos : int;

private var boxWidth = 500;
private var boxHeight : int = 500;

var levelReached :int = 0;

function Start() {

	
	var levelReachedLoad : int = PlayerPrefs.GetInt("levelReached");
	Debug.Log("LevelReachedLoad = "+levelReachedLoad);
	
	if(levelReachedLoad > 0)
	{
		levelReached = levelReachedLoad;
		
	}
	Debug.Log("levelReached"+levelReached);
	//PlayerPrefs.DeleteAll();
	//PlayerPrefs.SetInt("levelReached",0);
}

function OnGUI() {



//		if (GUI.Button(Rect(Screen.width-btnWidth,20,btnWidth-20,btnHeight),btnFB,""))
//		{
//			Debug.Log("Clicked the button");
//			
//			//--create a popover
//			
//			//--add a speech box 
//			GUI.Box(GUIBoxPosition,"");
//		}

	if(showLevels == true){
//		Debug.Log("show levels");

		btnVerticalPos = 120;
		
		GUI.Box(Rect (Screen.width/2-(boxWidth/2),btnVerticalPos-20,boxWidth,boxHeight),"");
//	
//		GUI.enabled = false;

		for(var i : int = 1; i <= 9; i++) {
		
			if(i > levelReached){
				GUI.enabled = false;
			}
		
			if (GUI.Button(Rect(Screen.width/2-(btnWidth/2),btnVerticalPos,btnWidth,btnHeight),"Level "+i))
			{
				Debug.Log("Clicked the button");
				Application.LoadLevel("scene"+i);
				
				//PlayerPrefs.SetInt("levelReached",i);
				
				
				//var levelReachedLoad : int = PlayerPrefs.GetInt("levelReached");
				//Debug.Log("level now = "+levelReachedLoad);
				

			}
			
			btnVerticalPos += (btnHeight + 10);
		}
		
		
//		GUI.enabled = true;
//		if (GUI.Button(Rect(Screen.width/2,btnVerticalPos,btnWidth,btnHeight),"Button 2"))
//		{
//			Debug.Log("Clicked the button");
//
//		}

		
		//LevelMenu.active = true;
		
		

	
	}



}

function Update()
{
	if(Input.GetKeyDown(KeyCode.Escape) == true)
	{
		Application.Quit();
	}
}