#pragma strict

//@script ExecuteInEditMode() //--makes this bit work without having to click play

private var controlTexture : Texture2D;
//public var myGUIStyle : GUIStyle;
public var skin : GUISkin;
public var speech : Array;

private var GUIBoxPosition = Rect(20,20,660,100);
private var GUITextPosition = Rect (135, 40, 530, 80);
private var GUIImagePosition = Rect (25,25,90,90);
private var currentText = "";
private var isTalking = false;
private var gameController : GameControllerScript;
private var speechLineNum : int = 0;




//private var count : int = 0;

function Start () {
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	gameController = gameControllerObject.GetComponent (GameControllerScript);
	
	controlTexture = Resources.Load("cargobot",Texture2D);
}



function OnGUI() {

//		currentText = "You're the best pilot I could drag out of the stasis pods. So I really hope you're not a disappointment";


	if(isTalking) {

		//--add a speech box 
		GUI.Box(GUIBoxPosition,"");
		
		//-- add the text
		GUI.skin = skin;
		GUI.Label (GUITextPosition, currentText);
		//GUI.Label (GUITextPosition, currentText, myGUIStyle);
		
		//--add an image
		GUI.Label (GUIImagePosition, controlTexture);
	
		
	}

}

function SayGoalDialogue(goalNum) {

	Debug.Log("goalNum = "+goalNum);
	
	
	
	//--which level are we in? 
	switch (gameController.levelNum)
    {
	    case 1:

			switch (goalNum)
		    {
			    case 0:
			    	//--when we collect the crate
			    	speech = [
			        	"Now hold still while I load you up",
			        	"Take this to the other side of the bay"
			        ];

				break;
			        
			    case 1:
			    	//--when we deliver the crate
			        speech = [
			        	"You sure you have a pilot's licence?",
			        	"Now park back on the deck"
			        ];
			    break;
			        

			}
		break;
			    
		case 2:
			switch (goalNum)
		    {
			    case 0:
			    	//--when we collect the crate
			    	speech = [
			        	"All that time in stasis I wondered if you'd forgotten how to fly",
			        	"Looks like I was right"
			        ];

				break;
			        
			    case 1:
			    	//--when we deliver the crate
			        speech = [
			        	"3 million years in deep space and we still have to move cargo around",
			        	"Seems pointless doesn’t it?",
			        	"Park back on the deck"
			        ];

			    break;

			}
		break;
		
		case 3:
			switch (goalNum)
		    {
			    case 0:
			    	//--when we collect the crate
			    	speech = [
			        	"There must be more exciting things to do in deep space than this",
			        	"But what do you know, you’ve been in stasis for 3 million years"
			        ];

				break;
			        
			    case 1:
			    	//--when we deliver the crate
			        speech = [
			        	"Did you dream in stasis?",
			        	"I hope it wasn't about moving crates"
			        ];

			    break;

			}
		break;
		
		case 4:
			switch (goalNum)
		    {
			    case 0:
			    	//--when we collect the crate
			    	speech = [];

				break;
			        
			    case 1:
			    	//--when we deliver the crate
			        speech = [
			        	"Holly's detected a ship approaching us. Not sure who or what yet",
			        	"But the Captain is taking this very seriously"
			        ];

			    break;

			}
		break;
		
		case 5:
			switch (goalNum)
		    {
			    case 0:
			    	//--when we collect the crate
			    	speech = [
			        	"The Captain has called everyone to battlestations just in case they're hostile",
			        	"Better shift these cargo containers fast!"
			        ];

				break;
			        
			    case 1:
			    	//--when we deliver the crate
			        speech = [
			        	"Hurry the smeg up and park back on the deck"
			        ];

			    break;

			}
		break;
		
		case 6:
			switch (goalNum)
		    {
			    case 0:
			    	//--when we collect the crate
			    	speech = [
			        	"It's the Hymenoptera! The smegging Hymenoptera!",
			        	"It’s a hive ship. Coming right for us!"
			        ];

				break;
			        
			    case 1:
			    	//--when we deliver the crate
			        speech = [
			        	"Better start shifting these faster",
			        	"The Captain needs equipment loading onto the SpaceEagles"
			        ];

			    break;

			}
		break;
		
		case 7:
			switch (goalNum)
		    {
			    case 0:
			    	//--when we collect the crate
			    	speech = [
		        		"Never heard of them? How long exactly WERE you in stasis?!",
			        	"The Hymenoptera are like, the nastiest insect aliens in the entire galaxy",
			        	"They’ve got these giant crushing mandibles...",
			        	"Well you get the idea. They’re pretty badass "
			        ];

				break;
			        
			    case 1:
			    	//--when we deliver the crate
			        speech = [
			        	"The Captain might order you to go out and fight",
			        	"Ever flown a Starbug in combat?",
			        	"It's cold outside.",
			        	"There's no kind of atmosphere",
			        	"You're all alone",
			        	"More or less"
			        ];

			    break;

			}
		break;

		case 8:
			switch (goalNum)
		    {
		    
			    case 0:
			    	//--when we collect the crate
			    	speech = [
			        	"Seems silly us being in here when people are fighting out there doesn’t it?"
			        ];

				break;
			        
			    case 1:
			    	//--when we deliver the crate
			        speech = [
			        	"I wonder how many ships we’ll lose? "
			        ];

			    break;
			    
			}
		break;
		
		default:
	        Debug.Log("No dialogue for this level - or maybe level num not set on helper?");
	    break;
	}
	
	SayAnyDialogue(speech);
	
	
}

//--make this reusable so can also say dialogue at the start of a mission
function SayAnyDialogue(speechArray : Array){

	Debug.Log("say some dialogue from an array = "+speechArray);
	
	for(var i : int = 0; i < speechArray.length; i++) {
 
		currentText = speechArray[i];
		isTalking = true;
		
		yield WaitForSeconds (3.25);
		

	}
	
	isTalking = false;
}

