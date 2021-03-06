
    
    // $player1Name.val(player1Name);

    // OPENING screen with inputs for player1 player 2 names
    // hide opening screen when "ok" button is clicked.
    // add player names on bottom screen
    // engage game 


    var $motherShips = $(".mother-ship")
    var bulletWidth = 5;
    var bulletHeight = 5;

    var motherShipWidth = $motherShips.eq(0).width();
    var $player1Name = $("#name1");                                                                         //Declaring all the variables at the beginning 
    var $player2Name = $("#name2");
    var $nameInput = $("#input-name");
    var $okBtn = $("#ok-btn");
    var $spaceCraft = $("#space-craft");
    var $startButton = $("#start-game");
    var $invaders = $("#grid");
    var $score = $("#score-number");
    var $scorePlayer1 = $(".score-player1");
    var $scorePlayer2 = $(".score-player2");
    var $openingImage = $("#opening-image");
    var $player2Button = $("#player2Ready");
    var $invisibleMarker1 = $(".invisible-marker1");
    var $invisibleMarker2 = $(".invisible-marker2");
    var $gameOver = $("#gameOver");
    var score = 0;                                                                                          // Initializing score to 0 to begin with.
    var theScore = $score.text(score); 
    var invadersMovingTime = 10;

    var enemyMovement;   
    var movement;

    $startButton.hide();                                                                                    //hiding all the buttons which show up once game begins
    $spaceCraft.hide();
    $invaders.hide();
    $player2Button.hide();
    $gameOver.hide();


    var game = {                                                                                            // Added the functions in an object. 
        players:    [{name:$player1Name}, {name:$player2Name}],
        photonMoving: false,
        currentPlayer: null,

        switchPlayer: function(){                                                                           // If current player is 0, switch to 1 and add mark on the now current player
                        if(game.currentPlayer === game.players[0] && 
                        $invisibleMarker1.css("color","red")){              
                        game.currentPlayer = game.players[1]
                        $invisibleMarker1.css("color","black")  ;            
                        $invisibleMarker2.css("color","red");                 
                        
                        // show a button saying player 2, fire.
                        }
                        // } else {
                        //     game.currentPlayer = game.players[0]
                        // }
                    },
        goButton:   function(){                                                                             // Adds the input names to the bottom of screen
                        var theName =  $nameInput.val(); 
                        if($player1Name.text() === "name of player"){
                            // console.log($player1Name)
                            $startButton.on("click",game.showGame)
                            $player1Name.text(theName + " ");
                            // console.log('You typed');
                            // console.log(theName);
                            $nameInput.attr("placeholder","Who's Player-2 ?");                              // change the placeholder to "who's player-2 ?"
                        }else{
                            $player2Name.text(theName + " ");
                            console.log(theName);                        
                        }
                        $nameInput.val("")
                        function hideInput(){                                                               // hide the input divs after players enter names.
                            $(this).parent().hide(1000);
                            $startButton.show(1000);
                            $openingImage.hide(1000);    
                        }
                    $okBtn.on("click", hideInput);     
                    },

        showGame:   function(){
                        game.currentPlayer = game.players[0];                                               // starts the game and shows the invaders and craft.

                        $spaceCraft.css("marginLeft","562");
                        $spaceCraft.show(500);
                        $invaders.show(500);
                        $openingImage.hide(500);
                        $startButton.hide(500);
                        $player2Button.hide(500);
                        
                        enemyMovement = setInterval(game.moveRight,15);
                    },

        moveRight:  function(){                                                                             // Moving the invaders right, left and down.
                        var $windowWidth = $(window).width();
                        // console.log(enemyMovement)
                        $invaders.css("marginLeft", "+=4px")
                        if(parseInt($invaders.css("marginLeft"))>($windowWidth-275)){            
                            clearInterval(enemyMovement)
                            enemyMovement = setInterval(game.moveDown, invadersMovingTime)}

                        if(parseInt(($invaders.css("marginTop"))) > 300){
                            clearInterval(enemyMovement);
                            game.stopGame();
                            // console.log(parseInt(($invaders.css("marginTop"))))
                            }
                },

        moveDown:   function(){
                        $invaders.css("marginTop", "+=16px")
                        // console.log((parseInt($invaders.css("marginTop")) > parseInt(100)))
                        if(parseInt($invaders.css("marginTop")) > parseInt(50)){
                            clearInterval(enemyMovement);
                            enemyMovement = setInterval(game.moveLeft, invadersMovingTime)}      
                },

        moveLeft:   function(){
                        $invaders.css("marginLeft", "-=4px")   
                        if(parseInt($invaders.css("marginLeft")) < 2){
                            clearInterval(enemyMovement)
                            // console.log($invaders.css("marginLeft"))
                            enemyMovement = setInterval(game.moveDownAgain, invadersMovingTime)
                        }
                    },

        moveDownAgain:  function(){
                            $invaders.css("marginTop", "+=16px")
                            if(parseInt($invaders.css("marginTop"))>100){            
                                clearInterval(enemyMovement)
                                enemyMovement = setInterval(game.moveRight, invadersMovingTime)}
                        }, 

        moveCraft:  function(e){                                                                            // When keyboard arrows are pressed, craft moves.                               
                        if(e.keyCode == "37"){   
                            console.log("move craft left")
                                $spaceCraft.css("left", "-=1%");
                        }
                        if (e.keyCode == "39"){   
                            console.log("move craft right")
                                $spaceCraft.css("left", "+=1%");
                        }
                    },

        photon:     function(e){                                                                            // When space bar is pressed, photons fire.
                        
                        if(e.keyCode == "32"){
                            var audi = new Audio('shoot.wav')
                            audi.volume = .1;
                                audi.play();
                            console.log('fire!')
                            var $bullet = $('<div>').addClass('bullet').css({                               // Creates a new bullet each time spacebar is hit
                                top: $spaceCraft.offset().top,                                              // The new bullet(s) are at the same position as the space craft
                                left: $spaceCraft.offset().left
                            })
                            $('#space').append($bullet)                                                     // New bullet is appended into the space div.
                            var bulletMovement = setInterval(function() {
                                $bullet.css("top", "-=2px")
                                if($bullet.offset().top <= 0){                                              
                                    $bullet.remove()                                                        // Once bullet reaches top of the screen, the div is removed
                                    clearInterval(bulletMovement)
                                } else {
                                    game.hitInvader($bullet);  
                                }
                            }, 10)
                            

                            // if(game.photonMoving === false){
                            //     movement = setInterval(movephoton, 10)                                
                            // } 
                            // function movephoton(){
                            //     game.photonMoving = true;
                            //     $photon.css("marginTop", "-=2px");
                            //     if(parseInt($photon.css("marginTop")) < -100){
                            //         // console.log($photon.css("marginTop"))
                            //         clearInterval(movement)
                            //         game.photonMoving = false;
                            //         $photon.css('marginTop', '375px')                                     
                            //     }
                            //         game.hitInvader();  
                                                                  
                            // }    
                                // if(parseInt($photon.css("marginTop")) < parseInt($invaders.css("marginTop")) && $photon.css("marginLeft") < $invaders.css("width")){
                                }
                            },
                        
        hitInvader: function(bullet){
                        var $invadersx = {x: $invaders.offset().top, y: $invaders.offset().left,                // if position of photon = position of invader div, explode(hide)
                                            width: $invaders.width(), height: $invaders.height()}
                        var bulletx = {x: bullet.offset().top, y: bullet.offset().left, 
                                        width: bullet.width(), height: bullet.height()}
                        // console.log($invaders.offset());
                        // console.log($invadersx.x < bulletx.x + bulletx.width);

                        if ($invadersx.x < bulletx.x + bulletx.width &&
                            $invadersx.x + $invadersx.width > bulletx.x &&
                            $invadersx.y < bulletx.y + bulletx.height &&
                            $invadersx.height + $invadersx.y > bulletx.y){
                            $invaders.css("background-color", "red")
                            score = score + 10;
                            $score.text(score);
                            console.log("collision")
                        } else {
                                $invaders.css("background-color", "transparent")
                        }                                                                                             
                    },
                            // hitInvader: function(bullet){
                            //     /////////////////////////////
                            //     var bulletOffset = bullet.offset()

                            //     for(var i = 0; i < 60; i++){
                            //         var ll = $motherShips.eq(i)
                            //         var llOffset = ll.offset()

                            //         var llx = {x: llOffset.top, y:llOffset.left,                // if position of photon = position of invader div, explode(hide)
                            //                         width: motherShipWidth, height:5}
                            //         var bulletx = {x: bulletOffset.top, y: bulletOffset.left, 
                            //                         width: bulletWidth, height: bulletHeight}
                        
            
                            //         if (llx.x < bulletx.x + bulletx.width &&
                            //             llx.x + llx.width > bulletx.x &&
                            //             llx.y < bulletx.y + bulletx.height &&
                            //             llx.height + llx.y > bulletx.y){
                            //             ll.css("background-color", "red")
                            //             score = score + 10;
                            //             $score.text(score);
                            //             ll.hide();
                            //             console.log("collision")
                            //         } else {
                            //                 ll.css("background-color", "transparent")
                            //         }
                            //  } ////////////////////////
                            // },
                
        stopGame:   function(){
                        game.scoreCard();
                        clearInterval(movement)
                        $spaceCraft.hide();
                        $invaders.css("marginTop","0")                        
                        if($invisibleMarker2.css("color") === "rgb(255, 0, 0)"){
                            game.gameOver();
                        }else{ 
                            score = 0;                            
                            $invaders.hide(3000);
                            $player2Button.show(500);
                            $player2Button.on("click",game.showGame);                                
                            game.switchPlayer();
                            }
                    },

        scoreCard:  function(){                   
                        if($scorePlayer1.text() === ", score"){
                            console.log($scorePlayer1.text(score));
                            if(score < 1000){
                                alert("They killed you!")
                            }
                            // console.log('You typed');
                            // console.log(theName);
                        } else{
                            if(score < 1000){
                                alert("They killed you!")
                            }
                            console.log($scorePlayer2.text(score))
                        }
                    },
        
        winner:     function(){
                        $gameOver.show(1000);
                        if(score < 5000){
                            $gameOver.text("They've anhilated you!!") 
                        }else{
                            if(parseInt($scorePlayer1.text())>parseInt($scorePlayer2.text())){                                  // higher scored player won.                
                                $gameOver.text($player1Name.text() + " has saved the planet!")
                            }else if
                                (parseInt($scorePlayer2.text())>parseInt($scorePlayer1.text())){                                  // higher scored player won.                                            
                                $gameOver.text($player2Name.text() + " has saved the planet!")                        
                            }else{
                            $gameOver.text("Both of you have saved the planet!")                        
                        }
                        }
                    },
        
        gameOver:   function(){
                        console.log("Game Over")
                        $invaders.hide();
                        $openingImage.show(500);
                        $gameOver.text("")
                        game.winner();
                        $invaders.css("marginTop","0")                           
                    }
        }


    window.addEventListener("keydown", game.moveCraft);

    window.addEventListener("keydown", game.photon);

    $okBtn.on("click", game.goButton);

    // $spaceCraft.css({'marginTop': '10px', 'marginLeft': '50px'})


    //keydown, key up, left, right functions
            
    // create a variable called moving where if photon is already moving, don't run the move function again till photon reaches border.

