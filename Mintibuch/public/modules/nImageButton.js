export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'https://picsum.photos/seed/picsum/200');
    this.load.image('star', 'https://picsum.photos/seed/picsum/200/300');
}

function create() {
    const background = this.add.image(400, 300, 'background'); 
    background.setDisplaySize(800, 600);
    const userInput = config.userInput; 
    const objectCount = parseInt(userInput) || 1; 
    
    
    const startX = 50; 
    const startY = 50; 
    const spacingX = 100;
    const spacingY = 100; 
    const maxPerRow = 5; 
    
    for (let i = 0; i < objectCount; i++) {
        
        const x = startX + (i % maxPerRow) * spacingX; 
        const y = startY + Math.floor(i / maxPerRow) * spacingY; 

        
        this.add.image(x, y, 'star').setScale(0.5);

        
        this.add.text(x - 20, y + 40, `Item ${i + 1}`, { font: '16px Arial', fill: '#000000' });

        
        const button = this.add.rectangle(x, y + 80, 100, 30, 0x007bff).setInteractive();
        const buttonText = this.add.text(x - 30, y + 70, 'Click Me', { font: '14px Arial', fill: '#ffffff' });

        
        button.on('pointerdown', () => {
            alert(`Button for Item ${i + 1} clicked!`);
        });
    }
}