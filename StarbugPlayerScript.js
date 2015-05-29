#pragma strict
private var speed : float = 100;
private var rotationSpeed : float = 25;
private var gameController : GameControllerScript;
//private var playerVFXObject : GameObject;
private var badRotationTimer : float;
private var myTorque : float = 0;

public var health : int = 100;

var ThrustParticleLeft : ParticleSystem;
var ThrustParticleRight : ParticleSystem;


var explosionVFX : GameObject;

function Start () {
	//playerVFXObject = GameObject.Find("PlayerVFX"); 
	
	//-find the gameController so we can reference its functions
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	gameController = gameControllerObject.GetComponent (GameControllerScript);
	 

	ThrustParticleLeft.enableEmission = false;
	ThrustParticleRight.enableEmission = false;

}

function FixedUpdate () {

//	var mousePos = Input.mousePosition;
	var ClickedLeft = false;
	var ClickedRight = false;
	
//	if(Input.GetMouseButton(0)){
//		//Debug.Log("mousepos = "+mousePos.x);
//		if(mousePos.x < Screen.width/2){
//			
//			//Debug.Log("mouse on left");
//			ClickedLeft = true;
//		}else {
//
//			//Debug.Log("mouse on right");
//			ClickedRight = true;
//		}
//	}
	
	
	
	if (Input.touchCount > 0){

		var myTouches = Input.touches;
		Debug.Log(myTouches);
		
		for(var i = 0; i < Input.touchCount; i++)
		{
			//Debug.Log(i+"="+myTouches[i]);
			
			if (myTouches[i].position.x < Screen.width/2) 
	        {
	        	ClickedLeft = true;
	        }
	        
	        if (myTouches[i].position.x > Screen.width/2) 
	        {
	        	ClickedRight = true;
	        }
		}

	}
	

	
	if((Input.GetKey("left") || ClickedLeft == true) && (gameController.isPaused == false))
	{
		rigidbody.AddRelativeTorque (0,0,-rotationSpeed);
		rigidbody.AddRelativeForce (Vector3.up * speed);
	
		ThrustParticleLeft.enableEmission = true;

	}else{
		ThrustParticleLeft.enableEmission = false;
	}
	
	if((Input.GetKey("right") || ClickedRight == true) && (gameController.isPaused == false))
	{
		rigidbody.AddRelativeTorque (0,0,rotationSpeed+5);//--additional 10 to counter the weird imbalance
		rigidbody.AddRelativeForce (Vector3.up * speed);
		
		ThrustParticleRight.enableEmission = true;

	} else {
		ThrustParticleRight.enableEmission = false;
	}

	
}

function Update ()
{
	//var TimerText : GUIText = GameObject.Find("TimerText").guiText;
	
	//--count how long it's been on it's side.	
	if( (transform.eulerAngles.z >= 80) && (transform.eulerAngles.z <= 280) )
	{
		badRotationTimer++;
	} else {
		badRotationTimer = 0;
	}
	
	//--restart of been on it's side for more than 3 seconds
	if( ((badRotationTimer*Time.deltaTime) > 3) && (rigidbody.velocity.magnitude <= 0.1) ){
		gameController.RestartLevel();
	}
	//TimerText.text = "d"+badRotationTimer*Time.deltaTime;
	//Debug.Log(rigidbody.velocity.magnitude);
	
}

function OnCollisionEnter(theCollision : Collision)
{
	if(theCollision.gameObject.tag == "Enemy")
	{
		//Debug.Log("hit enemy");
		var exp : GameObject = Instantiate(explosionVFX,transform.position, transform.rotation);
		//Destroy(gameObject);
		gameObject.SetActive(false);
	
		//--reset the game in 2 seconds
		gameController.StartResetTimer();
		
	}
}

function OnTriggerEnter(other : Collider)
{
	if (other.tag == "GoalHelper") {
	
		//--but which mission helper? Find the number from the obj's variables	
		var HelperScript = other.GetComponent (GoalHelperScript);
		//Debug.Log("this is the helper for "+HelperScript.GoalNum);

		gameController.GoalAction(HelperScript.GoalNum);
		return;
		
	} /*else if (other.tag == "Boundary") {

		gameController.RestartLevel();
		return;
	} */
	//Debug.Log("Have hit "+other.name);
}