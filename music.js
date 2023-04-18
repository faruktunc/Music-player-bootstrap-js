class Music{
    constructor(title,singer, img,file){
        this.title=title;
        this.singer=singer;
        this.img=img || "default.jpg";
        this.file=file;
    }
    getName(){
        return this.title+" - " +this.singer;
    }
}
const musicList=[
    new Music("Kendine İyi Bak","No1","1.jpg","1.mp3"),
    new Music("Hırsız Var","Jagged","2.png","2.mp3"),
    new Music("Elma Şekerim","EÜ Öğrencileri",null,"3.mp3"),
    new Music("Gözlerime Çizdim Seni","Anonim","4.jpg","4.mp3"),
    new Music("Çiçeklerde bir telaş var","No1","1.jpg","5.mp3")
]