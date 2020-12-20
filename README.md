# *MyCargonaut*
###### *CS2016 Konzepte moderner Softwareentwicklung - Wintersemester 2020/2021*

## Build Status
[![Build Status](https://travis-ci.com/spahno/MyCargonaut.svg?branch=release)](https://travis-ci.com/spahno/MyCargonaut)

## Contributors
<a href="https://github.com/spahno">
<img alt="Julian Hermanspahn" src="https://avatars2.githubusercontent.com/u/56961433?s=460&u=ac9733d7c9f2d064ee6ee34afd30256d660f4e47&v=4" width="150" height="150"/>
</a>

<a href="https://github.com/richierubel">
<img alt="Richard Leichner" src="https://avatars2.githubusercontent.com/u/46709532?s=460&v=4" width="150" height="150"/>
</a>

<a href="https://github.com/lewe98">
<img alt="Lewe Lorenzen" src="https://avatars3.githubusercontent.com/u/74314678?s=460&u=17e20f01c901e3f68c3df05021970dce194fa1d7&v=4" width="150" height="150"/>
</a>

## Content
* [Installation](#installation)
* [Technology stack](#technology-stack)
* [Infrastructure](#infrastructure)
* [Domain model](#domain-model)
* [Class diagram](#class-diagram)
* [Wireframe](#wireframe)
* [Mockup](#mockup)

## Installation
To install the dependencies, run ``npm i``.

To start the app, run ``npm run ion`` in the root folder.

## Testing
**Before commiting** to the repository, run the following scripts.
* Run ``npm run test`` for unit testing.
* Run ``npm run e2e`` for end-to-end testing.
* Run ``npm run lint`` to find linting issues.
  
* *Optional:* Run ``npm run coverage`` to observe test coverage.

**Testing Strategy:** White-box-tests (unit testing)

## Deployment
When pushing to the main branch ``release``, the Travis bot will automatically commit the changes
to the ``gh-pages`` branch and deploy the app to [MyCargonaut](https://spahno.github.io/MyCargonaut).

## Technology stack
Technology | Usage
---------------------|----------
[WebStorm](https://www.jetbrains.com/webstorm) | IDE
[Ionic](https://ionicframework.com) | Cross-Platform Mobile App Development
[Angular](https://angular.io) | Frontend Development
[Firebase Firestore](https://firebase.google.com/docs/firestore) | Database (Cloud Firestore)
[Firebase Storage](https://firebase.google.com/docs/storage) | Database (Storage)
[Google People API](https://developers.google.com/people) | Authentication
[Travis CI](https://travis-ci.org) | Continuous Integration
[Hound CI](https://houndci.com) | Continuous Integration
[Github Pages](https://pages.github.com) | Deployment

## Infrastructure
Lorem Ipsum

## Domain model
<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2020-12-20T14:25:32.473Z" agent="5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15" etag="QdqXtUUoTTwqpnbQnt9-" version="14.1.1" type="device">
  <diagram id="-Nkc0TvABCEqhxJ61s-O" name="Page-1">
    <mxGraphModel dx="524" dy="744" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-1" value="Fahrt" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="2080" y="323" width="160" height="52" as="geometry">
            <mxRectangle x="1420" y="410" width="80" height="26" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-2" value="bezahlung" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="qPCwAwj6v8vwJFsBI8LU-1">
          <mxGeometry y="26" width="160" height="26" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-3" value="Bietet" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="1860" y="380" width="160" height="52" as="geometry">
            <mxRectangle x="1420" y="410" width="80" height="26" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-4" value="ladefläche" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="qPCwAwj6v8vwJFsBI8LU-3">
          <mxGeometry y="26" width="160" height="26" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-8" target="qPCwAwj6v8vwJFsBI8LU-3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1780" y="509" />
              <mxPoint x="1780" y="406" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-8" target="qPCwAwj6v8vwJFsBI8LU-1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="2190" y="512" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-8" target="qPCwAwj6v8vwJFsBI8LU-28">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1580" y="284" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-8" value="User" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="1494" y="489" width="160" height="46" as="geometry">
            <mxRectangle x="1420" y="410" width="80" height="26" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-9" value="_id" style="text;html=1;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="qPCwAwj6v8vwJFsBI8LU-8">
          <mxGeometry y="26" width="160" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-11" target="qPCwAwj6v8vwJFsBI8LU-4">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1940" y="500" />
              <mxPoint x="1940" y="500" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-11" value="Fahrzeuge" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="1860" y="620" width="160" height="52" as="geometry">
            <mxRectangle x="1420" y="410" width="80" height="26" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-12" value="kennzeichen" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="qPCwAwj6v8vwJFsBI8LU-11">
          <mxGeometry y="26" width="160" height="26" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-13" value="Tracking" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="2310" y="248" width="160" height="52" as="geometry">
            <mxRectangle x="1420" y="410" width="80" height="26" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-14" value="lieferobjekt" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="qPCwAwj6v8vwJFsBI8LU-13">
          <mxGeometry y="26" width="160" height="26" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-15" value="Bewertung" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="2321" y="393" width="160" height="52" as="geometry">
            <mxRectangle x="1420" y="410" width="80" height="26" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-16" value="fahrt" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="qPCwAwj6v8vwJFsBI8LU-15">
          <mxGeometry y="26" width="160" height="26" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-17" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-3" target="qPCwAwj6v8vwJFsBI8LU-1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-18" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-14" target="qPCwAwj6v8vwJFsBI8LU-1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="2230" y="287" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-19" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-8" target="qPCwAwj6v8vwJFsBI8LU-11">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1574" y="646" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-20" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1654" y="489" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-21" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1654" y="515" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-22" value="*" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1820" y="620" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-23" value="*" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1820" y="380" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-24" value="*" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2180" y="375" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-25" value="*" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1820" y="264" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-26" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-16" target="qPCwAwj6v8vwJFsBI8LU-1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="2250" y="489" as="sourcePoint" />
            <mxPoint x="2210" y="406.0344827586207" as="targetPoint" />
            <Array as="points">
              <mxPoint x="2230" y="432" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-27" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;" edge="1" parent="1" source="qPCwAwj6v8vwJFsBI8LU-28" target="qPCwAwj6v8vwJFsBI8LU-1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-28" value="Sucht" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="1860" y="258" width="160" height="52" as="geometry">
            <mxRectangle x="1420" y="410" width="80" height="26" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-29" value="lieferobjekt" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="qPCwAwj6v8vwJFsBI8LU-28">
          <mxGeometry y="26" width="160" height="26" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-30" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1580" y="469" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-31" value="*" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1940" y="432" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-32" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1940" y="600" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-33" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2020" y="264" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-34" value="0,1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2130" y="303" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-35" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2200" y="302" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-36" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2281" y="264" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-37" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2230" y="375" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-38" value="0,1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2281" y="412" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-39" value="1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2020" y="390" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="qPCwAwj6v8vwJFsBI8LU-40" value="0,1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="2120" y="380" width="40" height="20" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>

## Class diagram
Lorem Ipsum

## Wireframe
Lorem Ipsum

## Mockup
Lorem Ipsum
