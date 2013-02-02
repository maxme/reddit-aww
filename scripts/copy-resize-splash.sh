#!/bin/sh

if [ x"" == x"$1" ]; then
    echo "Usage: $0 splash-source-2048x2048.png"
    exit 1
fi

source=$1
out=..
outf=$out/ios/RedditAww/Resources/splash
outf=/tmp/mop

function resizeAndCrop() {
    size=$1
    out=$2
    convert $source -resize "$size^" -gravity center -crop $size+0+0 +repage $out
}

# iOS
resizeAndCrop 640x1136 $outf/Default-568h@2x~iphone.png
resizeAndCrop 2048x1496 $outf/Default-Landscape@2x~ipad.png
resizeAndCrop 1024x768 $outf/Default-Landscape~ipad.png
resizeAndCrop 1536x2008 $outf/Default-Portrait@2x~ipad.png
resizeAndCrop 768x1024 $outf/Default-Portrait~ipad.png
resizeAndCrop 640x960 $outf/Default@2x~iphone.png
resizeAndCrop 320x480 $outf/Default~iphone.png

# Android
#convert $source -resize 96x96 $out/android/res/drawable/icon.png

