#pragma strict
//---big "start" button on menu screen

var hoverColor = Color(.1,.9,.5, 1);
var defaultColor = Color();
var container :  GameObject;	//--get parent object so we can hide all after clicking

private var menuScript : MenuScript;


function Start()
{
	//--set default color
	defaultColor = renderer.material.GetColor("_Color");
	
	//-find the gameController so we can reference its functions
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	menuScript = gameControllerObject.GetComponent (MenuScript);
}

function OnMouseEnter() {
	renderer.material.SetColor( "_Color", hoverColor);
	
	
}

function OnMouseExit (){

	renderer.material.SetColor( "_Color", defaultColor);
}

function OnMouseDown() {
	
	//--check for furthest level reached
	if(menuScript.levelReached == 0) {
		Application.LoadLevel("scene1");
	}else {
		//--this isn't the first time the user has played
		//--choose a level
		menuScript.showLevels = true;
		container.active = false;	//--hide parent
	}
	

}


