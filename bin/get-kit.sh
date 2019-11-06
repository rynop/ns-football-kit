#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# sets per https://www.davidpashley.com/articles/writing-robust-shell-scripts/
set -o nounset  # exit if use uninit'd var
set -o errexit  # exit if any cmd returns non-0
set -o pipefail # exit if any piped cmd returns non-0

KIT="${1}"  # Comes in as mufc/251562
KITDASH="${KIT//\//-}"

stitch () {
    mkdir -p /tmp/stitch
    cd /tmp/stitch
    rm -f *.jpg

    wget -q https://kbis-cdn.fanobject.com/${KIT}/img/${KITDASH}${1}/zoom/TileGroup0/1-0-0.jpg   #up left
    wget -q https://kbis-cdn.fanobject.com/${KIT}/img/${KITDASH}${1}/zoom/TileGroup0/1-1-0.jpg   #up right
    wget -q https://kbis-cdn.fanobject.com/${KIT}/img/${KITDASH}${1}/zoom/TileGroup0/1-0-1.jpg   #low left
    wget -q https://kbis-cdn.fanobject.com/${KIT}/img/${KITDASH}${1}/zoom/TileGroup0/1-1-1.jpg   #low right

    convert +append 1-0-0.jpg 1-1-0.jpg top.jpg
    convert +append 1-0-1.jpg 1-1-1.jpg bottom.jpg
    convert -append top.jpg bottom.jpg full.jpg

    mkdir -p ${DIR}/../app/images/${KITDASH}
    echo "moving to ../app/images/${KITDASH}/${2}.jpg"
    mv full.jpg ${DIR}/../app/images/${KITDASH}/${2}.jpg
}

stitch "" "angle"
stitch "a" "back"
stitch "b" "front"
# stitch "c" "side"

# TODO: replace white bkg with trans
# https://www.remove.bg/ works best
# magick front.jpg  -fuzz 2% -fill none -draw "alpha 0,0 floodfill" -channel alpha -blur 0x2 -level 50x100% +channel result.png

# Color jersey
magick front.jpg \
    \( -clone 0 -canny 0x1+1%+10% -type bilevel \
    -define connected-components:mean-color=true \
    -define connected-components:area-threshold=2 \
    -connected-components 4 \
    -morphology close octagon:1 \
    -fill none -draw "alpha 0,0 floodfill" \
    -morphology erode diamond:1 \
    -alpha extract \
    -blur 0x1 -level 50x100% \) \
    -alpha off -compose copy_opacity -composite \
    result.png

# White Jersey
 magick back.jpg \
    \( -clone 0 -canny 0x1+1%+10% -type bilevel \
    -define connected-components:mean-color=true \
    -define connected-components:area-threshold=1 \
    -connected-components 4 \
    -morphology close octagon:5 \
    -fill none -draw "alpha 0,0 floodfill" \
    -morphology erode diamond:1 \
    -alpha extract \
    -blur 0x1 -level 50x100% \) \
    -alpha off -compose copy_opacity -composite \
    result.png

