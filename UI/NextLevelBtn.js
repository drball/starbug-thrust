#pragma strict
//--the button that appears on a popup when the level is completed. 
//--Either click it or press any key

private var gameController : GameControllerScript;

function Start () {

	//-find the gameController so we can reference its functions
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	gameController = gameControllerObject.GetComponent (GameControllerScript);
}

function OnMouseEnter() {
	renderer.material.color = Color.grey;
}

function OnMouseExit (){
	renderer.material.color = Color.white;
}

function OnMouseDown() {

	gameController.LoadNextLevel();
}

function FixedUpdate () {

	//Debug.Log("levelNum = "+gameController.levelNum);
	
	if(gameController.levelNum == 8)
	{
		//Debug.Log("level 8 menu!");
		
	} else {
		if(Input.anyKey)
		{
			gameController.LoadNextLevel();
		}
	}
}