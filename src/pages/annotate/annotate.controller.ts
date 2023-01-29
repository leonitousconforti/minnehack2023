import { Controller, Get, Render } from "@nestjs/common";

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Amet purus gravida quis blandit turpis. Et ligula ullamcorper malesuada proin libero nunc. Velit ut tortor pretium viverra suspendisse potenti. Non quam lacus suspendisse faucibus interdum. Non consectetur a erat nam at lectus. At risus viverra adipiscing at. Aliquam ultrices sagittis orci a scelerisque purus. Ac ut consequat semper viverra.
\n
Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Sed tempus urna et pharetra pharetra massa massa. In fermentum et sollicitudin ac. Volutpat est velit egestas dui id. Viverra maecenas accumsan lacus vel facilisis volutpat. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Sed velit dignissim sodales ut eu. Nunc sed velit dignissim sodales ut. Commodo sed egestas egestas fringilla phasellus faucibus. Nullam eget felis eget nunc lobortis mattis. Blandit cursus risus at ultrices. Dis parturient montes nascetur ridiculus mus mauris. In metus vulputate eu scelerisque felis imperdiet proin fermentum.
\n
Ac placerat vestibulum lectus mauris ultrices. Nibh ipsum consequat nisl vel pretium lectus quam id. Urna cursus eget nunc scelerisque viverra mauris in. Sed pulvinar proin gravida hendrerit lectus a. Sed faucibus turpis in eu mi bibendum. Dictum sit amet justo donec enim diam vulputate. Tempor commodo ullamcorper a lacus vestibulum sed. Dignissim convallis aenean et tortor at risus. Pellentesque id nibh tortor id aliquet lectus proin. Quisque id diam vel quam elementum pulvinar etiam. Malesuada fames ac turpis egestas sed.
\n
Ultricies lacus sed turpis tincidunt. Risus nullam eget felis eget. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Vel elit scelerisque mauris pellentesque pulvinar. Pharetra magna ac placerat vestibulum lectus. Lacus vel facilisis volutpat est velit egestas dui. Fringilla ut morbi tincidunt augue interdum velit euismod. Donec et odio pellentesque diam volutpat commodo. Nec dui nunc mattis enim ut. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Nisl nunc mi ipsum faucibus vitae. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Tellus pellentesque eu tincidunt tortor aliquam nulla. Vulputate mi sit amet mauris. Cursus euismod quis viverra nibh cras.
\n
Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Ut faucibus pulvinar elementum integer enim neque volutpat. Quam nulla porttitor massa id neque aliquam vestibulum. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Scelerisque purus semper eget duis at tellus at. Posuere lorem ipsum dolor sit amet. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. Gravida dictum fusce ut placerat. Leo integer malesuada nunc vel risus commodo viverra. Purus in massa tempor nec feugiat.
`;

const labels = ["gun control", "abortion"];
const speakers = ["me", "erik"];

@Controller()
export class AnnotateController {
    @Get("/annotate")
    @Render("annotate")
    root() {
        return { transcript: lorem, labels, speakers };
    }
}
