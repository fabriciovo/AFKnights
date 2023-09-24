import {Scene} from "phaser";

class JSONLevelScene extends Scene {
    constructor(key) {
        super({key: key});
    }

    init(data) {
        this.level_data = data.level_data;
    }

    create() {
        this.groups = {
            enemy_units: undefined,
            player_units: undefined
        };
        this.level_data.groups.forEach(function (group_name) {
            this.groups[group_name] = this.physics.add.group();
        }, this);

        this.prefabs = {};
        for (let sprite_name in this.level_data.prefabs) {
            let sprite_data = this.level_data.prefabs[sprite_name];
            this.create_prefab(sprite_name, sprite_data);
        }

    }

    create_prefab(sprite_name, sprite_data) {
        return new this.prefab_classes[sprite_data.type](this, sprite_name, sprite_data.position, sprite_data.properties);
    }

    update() {
        for (let prefab_name in this.prefabs) {
            this.prefabs[prefab_name].update();
        }
    }
}

export default JSONLevelScene;