#!/bin/sh

if [ x"" == x"$1" ]; then
    echo "Usage: $0 icon-source-1024x1024.png"
    exit 1
fi

source=$1
out=..

# iOS
# icons
convert $source -resize 72x72 $out/ios/RedditAww/Resources/icons/icon-72.png
convert $source -resize 144x144 $out/ios/RedditAww/Resources/icons/icon-72@2x.png
convert $source -resize 57x57 $out/ios/RedditAww/Resources/icons/icon.png
convert $source -resize 114x114 $out/ios/RedditAww/Resources/icons/icon@2x.png

# iTunesArtwork
# convert $source -resize 512x512 $out/iTunesArtwork.png
# convert $source -resize 1024x1024 $out/iTunesArtwork@2x.png


# Android
convert $source -resize 96x96 $out/android/res/drawable/icon.png
convert $source -resize 72x72 $out/android/res/drawable-hdpi/icon.png
convert $source -resize 36x36 $out/android/res/drawable-ldpi/icon.png
convert $source -resize 48x48 $out/android/res/drawable-mdpi/icon.png
convert $source -resize 96x96 $out/android/res/drawable-xhdpi/icon.png

