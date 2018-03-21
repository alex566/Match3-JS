
// import generateLevel from './level'

const app = new PIXI.Application();

document.body.appendChild(app.view);

PIXI.loader.add('gem1', 'Resources/rubin1.png')
    .add('gem2', 'Resources/rubin2.png')
    .add('gem3', 'Resources/rubin3.png')
    .load(loaded)

function loaded(loader, resources) {
    generateLevel([resources.gem1.texture, 
        resources.gem2.texture, 
        resources.gem3.texture])
}
