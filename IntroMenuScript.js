#pragma strict

private var gameController : GameControllerScript;
private var dialogueManager : DialogueScript;
private var introShowing : boolean;

function Start () {

	//-find the gameController so we can reference its functions
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	gameController = gameControllerObject.GetComponent (GameControllerScript);
	
	//--get the dialogue script - we have 1 thing to say
	dialogueManager = gameControllerObject.GetComponent (DialogueScript);
	
	introShowing = true;
}

function FixedUpdate () {
	
	if(Input.anyKey && (introShowing == true))
	{
		gameController.isPaused = false;
		
		introShowing = false;
		
		gameObject.transform.position.y = 999;
		
		ShowLevel1Dialogue();

	}
}

function ShowLevel1Dialogue() {
	//--level1 is unusal, it has an intro box (showing controls)
	
	gameObject.transform.position.y = 999;
		
	yield WaitForSeconds (.5);
	
	var speech = ["Welcome to deep space pilot!", "I dragged you out of stasis to help move some crates. Ready?"];
	dialogueManager.SayAnyDialogue(speech);
	yield WaitForSeconds (10);
	Destroy(gameObject);

}