import srcBk from '../textures/blizzard/bk.jpg'
import srcFt from '../textures/blizzard/ft.jpg'
import srcDn from '../textures/blizzard/dn.jpg'
import srcUp from '../textures/blizzard/up.jpg'
import srcLf from '../textures/blizzard/lf.jpg'
import srcRt from '../textures/blizzard/rt.jpg'

export default class SkyboxLoader {
    constructor() {
        this._orderNameTextures = ['bk', 'ft', 'up', 'dn', 'lf', 'rt']

        this.textures = []

        this.back = new Image();
        this.front = new Image();
        this.down = new Image();
        this.up = new Image();
        this.left = new Image();
        this.right = new Image();

        this.back.src  = srcBk; //0
        this.front.src = srcFt  //1
        this.down.src  = srcDn  //2
        this.up.src    = srcUp  //3
        this.left.src  = srcLf  //4
        this.right.src = srcRt  //5

        this.textures.push({texture : this.back, name : 'bk'});
        this.textures.push({texture : this.front, name : 'ft'});
        this.textures.push({texture : this.down, name : 'dn'});
        this.textures.push({texture : this.up, name : 'up'});
        this.textures.push({texture : this.left, name : 'lf'});
        this.textures.push({texture : this.right, name : 'rt'});

        this.readyTextures = [];
        this.listTextures  = [];
        
        for (let i = 0; i < this.textures.length; i++) {
            this.textures[i].texture.addEventListener('load', () => {
                this.listTextures.push(this.textures[i]);
                if (this.listTextures.length == 6) {
                    for (let i = 0; i < this._orderNameTextures.length; i++) {
                        for (let j = 0; j < this.listTextures.length; j++) {
                            if (this._orderNameTextures[i] == this.listTextures[j].name) {
                                this.readyTextures.push(this.listTextures[j].texture);
                            }
                        }
                    }
                }
            })
        }

        this.isInitSkybox = false;
    }
}