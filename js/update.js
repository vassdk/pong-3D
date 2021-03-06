// Moves the ball and paddles. Collision detection determines if point was scored.
function moveBallAndMaintainPaddles()
{

	ball.position.x += xDir;
	ball.position.y += yDir;
	
	if( Key.isDown( Key.A ) || Key.isDown( Key.LEFT ) )
	{
		if( !(paddle1.position.x <= -3.5) )
		{
			paddle1.position.x -= PLAYERSPEED;
		}
	}
	else if( Key.isDown( Key.D ) || Key.isDown( Key.RIGHT ) )
	{
		if( !(paddle1.position.x >= 3.5) )
		{
			paddle1.position.x += PLAYERSPEED;
		}
	}
	
	if( ball.position.x <= -4 )
	{
		ball.position.x = -3.9;
		xDir = -xDir;
		three.play();
	}
	else if( ball.position.x >= 4 )
	{
		ball.position.x = 3.9;
		xDir = -xDir;
		four.play();
	}
	var paddleCollisionDetect = Math.abs( paddle2.position.x - ball.position.x );
	if( ball.position.y < -8.5 && yDir < 0 )
	{
		yDir = BALLSPEED;
		
		var paddleCollisionDetect = Math.abs( paddle1.position.x - ball.position.x );
		if( paddleCollisionDetect <= 1.45 )
		{
			if( paddleCollisionDetect >= 0.9 )
			{
				if(paddle1.position.x < ball.position.x)
				{
					xDir = Math.abs(5 * xDir);
					xDir = (xDir >= 0.1) ? 0.1 : 0.08;
				}
				else
				{
					xDir = -Math.abs(5 * xDir);
					xDir = (xDir <= -0.1) ? -0.1 : -0.08;
				}
			}
			else if( paddleCollisionDetect >= 0.4 )
			{
				if(paddle1.position.x < ball.position.x)
				{
					xDir = Math.abs(3 * xDir);
					xDir = (xDir >= 0.05) ? 0.05 : 0.03;
				}
				else
				{
					xDir = -Math.abs(3 * xDir);
					xDir = (xDir <= -0.05) ? -0.05 : -0.03;
				}
			}
			else
			{
				if(paddle1.position.x < ball.position.x)
				{
					xDir = Math.abs(0.8 * xDir);
				}
				else
				{
					xDir = -Math.abs(0.8 * xDir);
				}
			}
			one.play();
		}
		else
		{
			ball.position.x = paddle1.position.x;
			ball.position.y = -8;
			p2Score++;
			var applause = Math.floor((Math.random() * 3) + 1);
			<!-- Sound FX provided by SoundBible.com and were not altered. -->
			switch(applause)
			{
				case 1:
				{
					applause1.play();
					break;
				}
				case 2:
				{
					applause2.play();
					break;
				}
				default:
				{
					applause3.play();
				}
			}
		}
	}
	else if( ball.position.y > 8.5 && yDir > 0 )
	{
		yDir = -BALLSPEED;
		
		if( paddleCollisionDetect <= 1.45 )
		{
			if( paddleCollisionDetect >= 0.9 )
			{
				if(paddle2.position.x < ball.position.x)
				{
					xDir = Math.abs(5 * xDir);
					xDir = (xDir >= 0.1) ? 0.1 : 0.08;
				}
				else
				{
					xDir = -Math.abs(5 * xDir);
					xDir = (xDir <= -0.1) ? -0.1 : -0.08;
				}
			}
			else if( paddleCollisionDetect >= 0.4 )
			{
				if(paddle2.position.x < ball.position.x)
				{
					xDir = Math.abs(3 * xDir);
					xDir = (xDir >= 0.05) ? 0.05 : 0.03;
				}
				else
				{
					xDir = -Math.abs(3 * xDir);
					xDir = (xDir <= -0.05) ? -0.05 : -0.03;
				}
			}
			else
			{
				if(paddle2.position.x < ball.position.x)
				{
					xDir = Math.abs(0.8 * xDir);
				}
				else
				{
					xDir = -Math.abs(0.8 * xDir);
				}
			}
			two.play();
		}
		else
		{
			ball.position.x = paddle2.position.x;
			ball.position.y = 8;
			p1Score++;
			PLAYERSPEED -= 0.002;
			var applause = Math.floor((Math.random() * 3) + 1);
			<!-- Sound FX provided by SoundBible.com and were not altered. -->
			switch(applause)
			{
				case 1:
				{
					applause1.play();
					break;
				}
				case 2:
				{
					applause2.play();
					break;
				}
				default:
				{
					applause3.play();
				}
			}
		}
	}
	if ( paddleCollisionDetect < COMPSPEED )
	{
		paddle2.position.x = ball.position.x;
	}
	else if( (paddle2.position.x < ball.position.x) )
	{
		if( !(paddle2.position.x >= 3.5) )
		{
			paddle2.position.x += COMPSPEED;
		}
	}
	else
	{	
		if( !(paddle2.position.x <= -3.5) )
		{
			paddle2.position.x -= COMPSPEED;
		}
	}
}


// Creates both scores, updating only when a score changes.
function updateScore()
{
	scene.remove( scoreObject1 );
	scene.remove( scoreObject2 );

	if(p1Score > 0 && p1Score < 10)
	{
		p1Score = "0" + Number(p1Score);
	}
	if(p2Score > 0 && p2Score < 10)
	{
		p2Score = "0" + Number(p2Score);
	}

	var scoreObjectGeometry1 = new THREE.TextGeometry(p1Score,
	{
		size: 2,
		height: 0.4,
		curveSegments: 10,
		bevelEnabled: false
	});
	var scoreObjectMaterial1 = new THREE.MeshLambertMaterial( {color: 0xFF0022} );
	scoreObject1 = new THREE.Mesh( scoreObjectGeometry1, scoreObjectMaterial1 );
	scoreObject1.position.x = -9.5;
	scoreObject1.position.y = 5;
	scoreObject1.position.z = 0.60;
	scoreObject1.rotation.x = 25 * Math.PI / 180;
	scene.add( scoreObject1 );

	var scoreObjectGeometry2 = new THREE.TextGeometry(p2Score,
	{
		size: 2,
		height: 0.4,
		curveSegments: 10,
		bevelEnabled: false
	});
	var scoreObjectMaterial2 = new THREE.MeshLambertMaterial( {color: 0x0022FF} );
	scoreObject2 = new THREE.Mesh( scoreObjectGeometry2, scoreObjectMaterial2 );
	scoreObject2.position.x = 6.5;
	scoreObject2.position.y = 5;
	scoreObject2.position.z = 0.60;
	scoreObject2.rotation.x = 25 * Math.PI / 180;
	scene.add( scoreObject2 );

	if(p1Score == 10 || p2Score == 10)
	{
		ball.position.x = 0;
		ball.position.y = 0;
		BALLSPEED = 0;
		yDir = 0
		xDir = 0;
	}
}
// Udates the crowd. Normal speedsimulates random movement. Fast speed for point scored.
function updateCrowd()
{
	var spectatorChosen = Math.floor((Math.random() * 10) + 1);

	switch(spectatorChosen)
	{
		case 1:
		{
			if(spectatorFlag[0] == 0)
			{
				spectator01.position.z += 0.1;
				spectator05.position.z += 0.1;
				spectator09.position.z += 0.1;
				spectator13.position.z += 0.1;
				spectatorFlag[0] = 1;
			}
			else
			{
				spectator01.position.z -= 0.1;
				spectator05.position.z -= 0.1;
				spectator09.position.z -= 0.1;
				spectator13.position.z -= 0.1;
				spectatorFlag[0] = 0;
			}
		}
		case 2:
		{
			if(spectatorFlag[1] == 0)
			{
				spectator02.position.z += 0.115;
				spectator06.position.z += 0.115;
				spectator10.position.z += 0.115;
				spectator14.position.z += 0.115;
				spectatorFlag[1] = 1;
			}
			else
			{
				spectator02.position.z -= 0.115;
				spectator06.position.z -= 0.115;
				spectator10.position.z -= 0.115;
				spectator14.position.z -= 0.115;
				spectatorFlag[1] = 0;
			}
		}
		case 3:
		{
			if(spectatorFlag[2] == 0)
			{
				spectator03.position.z += 0.09;
				spectator07.position.z += 0.09;
				spectator11.position.z += 0.09;
				spectator15.position.z += 0.09;
				spectatorFlag[2] = 1;
			}
			else
			{
				spectator03.position.z -= 0.09;
				spectator07.position.z -= 0.09;
				spectator11.position.z -= 0.09;
				spectator15.position.z -= 0.09;
				spectatorFlag[2] = 0;
			}
		}
		case 4:
		{
			if(spectatorFlag[3] == 0)
			{
				spectator04.position.z += 0.08;
				spectator08.position.z += 0.08;
				spectator12.position.z += 0.08;
				spectator16.position.z += 0.08;
				spectatorFlag[3] = 1;
			}
			else
			{
				spectator04.position.z -= 0.08;
				spectator08.position.z -= 0.08;
				spectator12.position.z -= 0.08;
				spectator16.position.z -= 0.08;
				spectatorFlag[3] = 0;
			}
		}
		case 5:
		{
			if(spectatorFlag[4] == 0)
			{
				spectator17.position.z += 0.125;
				spectator18.position.z += 0.125;
				spectator19.position.z += 0.125;
				spectator20.position.z += 0.125;
				spectatorFlag[4] = 1;
			}
			else
			{
				spectator17.position.z -= 0.125;
				spectator18.position.z -= 0.125;
				spectator19.position.z -= 0.125;
				spectator20.position.z -= 0.125;
				spectatorFlag[4] = 0;
			}
		}
		case 6:
		{
			if(spectatorFlag[5] == 0)
			{
				spectator37.position.z += 0.1;
				spectator25.position.z += 0.1;
				spectator29.position.z += 0.1;
				spectator33.position.z += 0.1;
				spectatorFlag[5] = 1;
			}
			else
			{
				spectator37.position.z -= 0.1;
				spectator25.position.z -= 0.1;
				spectator29.position.z -= 0.1;
				spectator33.position.z -= 0.1;
				spectatorFlag[5] = 0;
			}
		}
		case 7:
		{
			if(spectatorFlag[6] == 0)
			{
				spectator22.position.z += 0.115;
				spectator38.position.z += 0.115;
				spectator30.position.z += 0.115;
				spectator34.position.z += 0.115;
				spectatorFlag[6] = 1;
			}
			else
			{
				spectator22.position.z -= 0.115;
				spectator38.position.z -= 0.115;
				spectator30.position.z -= 0.115;
				spectator34.position.z -= 0.115;
				spectatorFlag[6] = 0;
			}
		}
		case 8:
		{
			if(spectatorFlag[7] == 0)
			{
				spectator23.position.z += 0.09;
				spectator27.position.z += 0.09;
				spectator40.position.z += 0.09;
				spectator35.position.z += 0.125;
				spectatorFlag[7] = 1;
			}
			else
			{
				spectator23.position.z -= 0.09;
				spectator27.position.z -= 0.09;
				spectator40.position.z -= 0.09;
				spectator35.position.z -= 0.09;
				spectatorFlag[7] = 0;
			}
		}
		case 9:
		{
			if(spectatorFlag[8] == 0)
			{
				spectator24.position.z += 0.08;
				spectator28.position.z += 0.08;
				spectator32.position.z += 0.08;
				spectator36.position.z += 0.08;
				spectatorFlag[8] = 1;
			}
			else
			{
				spectator24.position.z -= 0.08;
				spectator28.position.z -= 0.08;
				spectator32.position.z -= 0.08;
				spectator36.position.z -= 0.08;
				spectatorFlag[8] = 0;
			}
		}
		case 10:
		{
			if(spectatorFlag[9] == 0)
			{
				spectator21.position.z += 0.125;
				spectator26.position.z += 0.125;
				spectator39.position.z += 0.125;
				spectator31.position.z += 0.125;
				spectatorFlag[9] = 1;
			}
			else
			{
				spectator21.position.z -= 0.125;
				spectator26.position.z -= 0.125;
				spectator39.position.z -= 0.125;
				spectator31.position.z -= 0.125;
				spectatorFlag[9] = 0;
			}
		}
	}
}
// Render loop continuously updates screen at 60 FPS
function render()
{
	if( crowdCounter % 10 == 0 )
	{
		updateCrowd();
	}

	if( p1ScoreOld < 10 && p2ScoreOld < 10 )
	{
		moveBallAndMaintainPaddles();
		if( p1Score != p1ScoreOld || p2Score != p2ScoreOld )
		{
			updateScore();
			updateCrowd();
		}
		requestAnimationFrame( render );
		renderer.render( scene, camera );
		p1ScoreOld = p1Score;
		p2ScoreOld = p2Score;
		crowdCounter++;
	}
}