#pragma strict

public var introMenu : GameObject;

private var gameController : GameControllerScript;
private var dialogueManager : DialogueScript;

function Start () {

	//-find the gameController so we can reference its functions
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	gameController = gameControllerObject.GetComponent (GameControllerScript);
	
	//-find the dialogue script
	dialogueManager = gameControllerObject.GetComponent (DialogueScript);
	
	Level1();
}

function Level1 () {
	
	yield WaitForSeconds (.25);
	
	gameController.isPaused = true;
	
	ShowIntroScreen();

}

function ShowIntroScreen() {
	var introInstance = Instantiate(introMenu,Vector3(-5,2,6), Quaternion.identity);

}