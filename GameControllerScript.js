#pragma strict

private var player : GameObject;
private var winMenu : GameObject;
private var craneInstance : GameObject;
private var craneInstance2 : GameObject;
private var dialogueManager : DialogueScript;

public var crane : GameObject;
public var levelNum : int;
//public var missionNumText : GUIText;

private var playerStartPos : Vector3;
private var currentMissionNum : int = 0;
private var goalParticles : GameObject[];
private var restarting : boolean;
private var speech : Array;

static var isPaused : boolean = false;

public var sparkleSpawn : GameObject;

function Start () {
	player = GameObject.Find("Player");
	playerStartPos = player.transform.position;
	
	winMenu = GameObject.Find("WinMenu");
	
	dialogueManager = GetComponent(DialogueScript);
	
	HighlightCurrentGoal();
	
	
	//--find all helpers and hide them from view
	var helpers = GameObject.FindGameObjectsWithTag("GoalHelper");
	for (var helper in helpers){ 
		helper.renderer.enabled = false;
	}
	
	//--update the level progress - if never been here before
	var levelReached : int = PlayerPrefs.GetInt("levelReached");
	if(levelReached < levelNum){
		//--save new level progress
		PlayerPrefs.SetInt("levelReached",levelNum);
	}
	
	restarting = false;
	
	StartLevel();
	
}

function Update () {
	//player.transform.Rotate(0,0,50);
	
	if(Input.GetKeyDown(KeyCode.Escape) == true)
	{
		Application.LoadLevel("menu");
	}
}

function StartLevel(){

		
	//--create sparkle around player
	var sparkleStartPos = Vector3(playerStartPos.x, playerStartPos.y-3, playerStartPos.z);
	var spk = Instantiate (sparkleSpawn, playerStartPos, Quaternion.identity);
	Destroy(spk,3);

	
	//--hide win menu
	winMenu.SetActive(false);
		
	isPaused = false;
	
	if(restarting != true) {
	
		
		yield WaitForSeconds (1);
		
		switch (levelNum)
	    {
		    case 2:
		    	//--when we collect the crate
		    	speech = [
		        	"Another crate waiting for you on the yellow platform"
		        ];

			break;
		        
		    case 4:
		    	//--when we collect the crate
		    	speech = [
		        	"I have some potentially alarming news. I'll tell you after you deliver this next container"
		        ];

			break;
			
		    case 5:
		    	//--when we deliver the crate
		        speech = [
		        	"So that ship I told you about is getting closer.",
		        	"I really hope it's someone friendly. But out here in deep space what are the chances eh?"
		        ];

		    break;
		    
		    case 6:
		    	//--when we deliver the crate
		        speech = [
		        	"Oh my circuits! You know the approaching ship I told you about?",
		        	"You'll never guess who it is."
		        ];

		    break;
		    
		    case 7:
		    	//--when we deliver the crate
		        speech = [
		        	"Okay your reaction when I said Hymenoptera wasn’t what I expected."
		        ];

		    break;
		    
		     case 8:
		    	//--when we deliver the crate
		        speech = [
		        	"I’ve heard they’ve begun fighting outside"
		        ];

		    break;
		}
			
		if (speech) {
			dialogueManager.SayAnyDialogue(speech);
		}
		
	} else {
		//--restarting text
		speech = ["That was almost the worst piloting I've ever seen"];
		dialogueManager.SayAnyDialogue(speech);
	}

} 

//--restart the level after being killed
function RestartLevel() {

	//--make player not paused
	player.rigidbody.isKinematic = false;
	player.SetActive(true);
	player.rigidbody.velocity = Vector3.zero;
	player.rigidbody.angularVelocity = Vector3.zero;
	
	player.transform.position = playerStartPos;
	player.transform.rotation = Quaternion.identity;

	
	
	restarting = true;
	
	StartLevel();
}

//--reset game after a while
function StartResetTimer() {

	Invoke("RestartLevel",2);
}





function GoalAction(goalHelperNum : int) {

	//Debug.Log("Collided with "+goalHelperNum);
	

	if (goalHelperNum == currentMissionNum && isPaused != true) {
	
		UnHighlightAllGoals();
				
		isPaused = true; //--stops any user control
		
		var craneStartY = 10.2;
		var craneStartZ = 0.2;
		
		//--specific things for this game
		if(goalHelperNum == 0){
		
			//-- giving the crate
			
			craneInstance = Instantiate(crane,Vector3(player.transform.position.x-0,craneStartY,craneStartZ), Quaternion.identity);
			
			dialogueManager.SayGoalDialogue(currentMissionNum);
			
			yield WaitForSeconds (3);

			//Debug.Log("crane is down at "+craneInstance.transform.position.y);
			
			var craneInstanceScript = craneInstance.GetComponent (CraneScript);
			craneInstanceScript.RemoveCrate();
			craneInstanceScript.StartRetracting();
			
			currentMissionNum ++;
			//missionNumText.text = "Mission "+currentMissionNum;	//--for debug
			
			yield WaitForSeconds (2);
			
			isPaused = false;
		
		} else if (goalHelperNum == 1) {
		
			//-- taking the crate
			craneInstance2 = Instantiate(crane,Vector3(player.transform.position.x-0,craneStartY,craneStartZ), Quaternion.identity);
			var craneInstanceScript2 = craneInstance2.GetComponent (CraneScript);
			craneInstanceScript2.RemoveCrate();
			
			dialogueManager.SayGoalDialogue(currentMissionNum);
			
			yield WaitForSeconds (3);
			
			craneInstanceScript2.AddCrate();
			craneInstanceScript2.StartRetracting();
			
			currentMissionNum ++;
			//missionNumText.text = "Mission "+currentMissionNum;	//--for debug
			
			yield WaitForSeconds (2);
			
			isPaused = false;

		} else if (goalHelperNum == 2) {
		
			//-- mission is completed
			isPaused = true;
			yield WaitForSeconds (0.5);
			winMenu.SetActive(true);
			Debug.Log("end");
		}
		
		


		HighlightCurrentGoal();
		
	} else {
		Debug.Log("have hit an irrelevant mission helper");
	}

}

function HighlightCurrentGoal() {
	//Debug.Log("Highlight "+currentMissionNum);
	
	
	UnHighlightAllGoals();
	
	//--find the goal helper for this mission
	var currentGoalHelper = GameObject.Find("Goal"+currentMissionNum+"Helper");
	var currentGoalParticle = currentGoalHelper.transform.Find("GoalParticle");
		
	//--enable the particles only for the current mission
	currentGoalParticle.GetComponent(ParticleSystem).enableEmission = true;
	
}

function UnHighlightAllGoals() {
var goalParticles = GameObject.FindGameObjectsWithTag("GoalParticles");

	
	//--disable ALL particles with the tag
	for (var goalParticle in goalParticles){ 
	
		var myParticleSystem = goalParticle.GetComponent(ParticleSystem);
		myParticleSystem.enableEmission = false;
		//Debug.Log("Parent = "+myParticleSystem.transform.parent.gameObject.name);
	}
}

function PauseGame(isPaused : boolean){
	isPaused = true;
}

function LoadNextLevel(){
	var nextLevel : int = levelNum + 1;
	Debug.Log("next level is "+nextLevel);
	Application.LoadLevel("scene"+nextLevel);
}




