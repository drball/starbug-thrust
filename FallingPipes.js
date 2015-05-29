#pragma strict

private var player : GameObject;

function Start () {
	player = GameObject.Find("Player");
	
	
	//--loop through all child objects and set to not move
	for (var child : Transform in transform) {
    	child.rigidbody.isKinematic = true;
	}
}

function Update () {

}

function OnCollisionEnter(theCollision : Collision)
{
	Debug.Log("hit");
	if (theCollision.gameObject.tag == "Player") {
	
		var playerCollide = theCollision.gameObject;
		Debug.Log("magnitute = "+playerCollide.rigidbody.velocity.magnitude);
		
		if(playerCollide.rigidbody.velocity.magnitude > 2){
			//--loop through all children (pipes) & make fall
			
			for (var child : Transform in transform) {
				child.rigidbody.WakeUp();
    			child.rigidbody.isKinematic = false;
    		}
		}
		
	}
}