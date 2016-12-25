//http://www.netmaths.net/Docs#67AEE14007
//Page 1 : 53108959-e9e5-48ad-aaaa-0ad1bfd70624

import React, { Component } from 'react';
import { parseString }  from 'xml2js';



//QUESTION : QUI TRADUIT LE XML EN OBJET, LE CAHIER OU LES OBJETS?
//REPONSE : LES OBJETS, DONC LE CAHIER N'A PAS BESOIN DE CONNAITRE L'API DES OBJETS?

	/*
      <composante id="egdysb" type="multiplechoices">
          <properties dir="vertical" explicitObjective="true" orderingPolicy="ascending" preventMultipleSelection="false" />
          <groupe type="items">
            <item id="egdysc">
              <property name="selected" value="false" />
              <composante id="egdysd" type="text" idref="egdzfi">
                <properties translate="true" textToSpeechEnabled="true" comment="false" />
              </composante>
            </item>
            <item id="egdysf">
              <property name="selected" value="false" />
              <composante id="egdysg" type="text" idref="egdzfj">
                <properties translate="true" textToSpeechEnabled="true" comment="false" />
              </composante>
            </item>
            <item id="egdysi">
              <property name="selected" value="false" />
              <composante id="egdysj" type="text" idref="egdzfk">
                <properties translate="true" textToSpeechEnabled="true" comment="false" />
              </composante>
            </item>
            <item id="egdysl">
              <property name="selected" value="false" />
              <composante id="egdysm" type="text" idref="egdzfl">
                <properties translate="true" textToSpeechEnabled="true" comment="false" />
              </composante>
            </item>
            <item id="egdyso">
              <property name="selected" value="false" />
              <composante id="egdysp" type="text" idref="egdzfm">
                <properties translate="true" textToSpeechEnabled="true" comment="false" />
              </composante>
            </item>
            <item id="egdysr">
              <property name="selected" value="false" />
              <composante id="egdyss" type="text" idref="egdzfn">
                <properties translate="true" textToSpeechEnabled="true" comment="false" />
              </composante>
            </item>
            <item id="egdysu">
              <property name="selected" value="false" />
              <composante id="egdysv" type="text" idref="egdzfo">
                <properties translate="true" textToSpeechEnabled="true" comment="false" />
              </composante>
            </item>
            <item id="egdysx">
              <property name="selected" value="false" />
              <composante id="egdysy" type="text" idref="egdzfp">
                <properties translate="true" textToSpeechEnabled="true" comment="false" />
              </composante>
            </item>
          </groupe>
          <correction guid="C03143A7-D67A-48E9-B22F-B6D5200F6AB7">
            <logicalOperator>and</logicalOperator>
            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />
            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />
            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />
            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />
            <condition kind="BoolCheckAnswer" expressionComparaison="1=2" />
            <condition kind="BoolCheckAnswer" expressionComparaison="1=2" />
            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />
            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />
          </correction>
        </composante>  
    */

class MultipleChoices extends Component {


	constructor(props){
    super(props);

    this.inputs = [];

    var _id = Math.round(Math.random()*10000);

    this.state = {id : _id };


    console.log(this.props.xml);
    console.log(this.props.ress);
	}


	render(){

    //console.log(this.props.xml.composante);
    //console.log(this.props.xml.composante.groupe);
    //console.log(this.props.xml.composante.groupe[0]);
    //console.log(this.props.xml.composante.groupe[0].item);

    var _this = this;

    this.props.xml.composante.groupe[0].item.forEach(function(input, index){
      console.log(input);
      var idref = input.composante[0].$.idref;
      _this.inputs.push(<ChoiceInput groupid={_this.state.id } id={idref} text={_this.props.ress[idref]} />);
    });

    return (

        <div>
          Choix multiple

          <ul>
            {this.inputs}
          </ul>

        </div>

      );
	}

}


class ChoiceInput extends Component
{
    constructor(props){
      super(props); 
    }

    render(){
      return(
        <li><input name={"multichoices"+this.props.groupid } id={this.props.id} type="radio" /><label for={this.props.id}>{this.props.text}</label></li>
      );
    }

}




class Bookpage extends Component {

 

	constructor(props){
    super(props); 

    //var parseString = require('xml2js').parseString;


     var xmlString = '<composante id="egdysb" type="multiplechoices">          <properties dir="vertical" explicitObjective="true" orderingPolicy="ascending" preventMultipleSelection="false" />          <groupe type="items">            <item id="egdysc">              <property name="selected" value="false" />              <composante id="egdysd" type="text" idref="egdzfi">                <properties translate="true" textToSpeechEnabled="true" comment="false" />              </composante>            </item>            <item id="egdysf">              <property name="selected" value="false" />              <composante id="egdysg" type="text" idref="egdzfj">                <properties translate="true" textToSpeechEnabled="true" comment="false" />              </composante>            </item>            <item id="egdysi">              <property name="selected" value="false" />              <composante id="egdysj" type="text" idref="egdzfk">                <properties translate="true" textToSpeechEnabled="true" comment="false" />              </composante>            </item>            <item id="egdysl">              <property name="selected" value="false" />              <composante id="egdysm" type="text" idref="egdzfl">                <properties translate="true" textToSpeechEnabled="true" comment="false" />              </composante>            </item>            <item id="egdyso">              <property name="selected" value="false" />              <composante id="egdysp" type="text" idref="egdzfm">                <properties translate="true" textToSpeechEnabled="true" comment="false" />              </composante>            </item>            <item id="egdysr">              <property name="selected" value="false" />              <composante id="egdyss" type="text" idref="egdzfn">                <properties translate="true" textToSpeechEnabled="true" comment="false" />              </composante>            </item>            <item id="egdysu">              <property name="selected" value="false" />              <composante id="egdysv" type="text" idref="egdzfo">                <properties translate="true" textToSpeechEnabled="true" comment="false" />              </composante>            </item>            <item id="egdysx">              <property name="selected" value="false" />              <composante id="egdysy" type="text" idref="egdzfp">                <properties translate="true" textToSpeechEnabled="true" comment="false" />              </composante>            </item>          </groupe>          <correction guid="C03143A7-D67A-48E9-B22F-B6D5200F6AB7">            <logicalOperator>and</logicalOperator>            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />            <condition kind="BoolCheckAnswer" expressionComparaison="1=2" />            <condition kind="BoolCheckAnswer" expressionComparaison="1=2" />            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />            <condition kind="BoolCheckAnswer" expressionComparaison="1=1" />          </correction>        </composante>';
  
     var xmlStringRess = '<resources><resource id="egdzfg"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span color=&quot;#057ac3&quot;&gt;L\'ensemble des nombres rationnels, noté &lt;/span&gt;&lt;span color=&quot;#057ac3&quot; fontSize=&quot;24&quot;&gt;#p&lt;/span&gt;&lt;span color=&quot;#057ac3&quot;&gt; est l\'ensemble de tous les nombres qui peuvent s\'exprimer sous la forme d\'un &lt;/span&gt;&lt;span color=&quot;#057ac3&quot; fontWeight=&quot;bold&quot;&gt;quotient&lt;/span&gt;&lt;span color=&quot;#057ac3&quot;&gt; #d de deux nombres entiers où &lt;/span&gt;&lt;span color=&quot;#057ac3&quot; fontStyle=&quot;italic&quot; fontWeight=&quot;bold&quot;&gt;b&lt;/span&gt;&lt;span color=&quot;#057ac3&quot;&gt; est non nul.&lt;/span&gt;&lt;/p&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span color=&quot;#057ac3&quot; fontSize=&quot;10&quot;&gt;&lt;/span&gt;&lt;/p&gt;&lt;p styleName=&quot;textQuote2&quot;&gt;&lt;span color=&quot;#000000&quot; fontSize=&quot;17&quot; fontStyle=&quot;normal&quot;&gt;Ainsi par exemple, −12, −¼,  1¾, et 30,123 sont des nombres rationnels représentés sous diverses notations.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span color=&quot;#057ac3&quot;&gt;The set of rational numbers, &lt;/span&gt;&lt;span color=&quot;#057ac3&quot; fontSize=&quot;24&quot;&gt;#p,&lt;/span&gt;&lt;span color=&quot;#057ac3&quot;&gt; is the set of all numbers that can be expressed in the form of a &lt;/span&gt;&lt;span color=&quot;#057ac3&quot; fontWeight=&quot;bold&quot;&gt;quotient&lt;/span&gt;&lt;span color=&quot;#057ac3&quot;&gt; #d of two integers where &lt;/span&gt;&lt;span color=&quot;#057ac3&quot; fontStyle=&quot;italic&quot; fontWeight=&quot;bold&quot;&gt;b⁢⁢&lt;/span&gt;&lt;span color=&quot;#057ac3&quot;&gt; is non-zero.&lt;/span&gt;&lt;/p&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span color=&quot;#057ac3&quot; fontSize=&quot;10&quot;&gt;&lt;/span&gt;&lt;/p&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span color=&quot;#000000&quot; fontSize=&quot;17&quot;&gt;For example, −12, −¼,  1¾, and 30,123 are rational numbers represented in different notations.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfh"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontWeight=&quot;normal&quot;&gt;Parmi les nombres suivants, cochez ceux qui appartiennent à&lt;/span&gt;&lt;span fontWeight=&quot;bold&quot;&gt; &lt;/span&gt;&lt;span fontSize=&quot;24&quot; fontWeight=&quot;bold&quot;&gt;#p&lt;/span&gt;&lt;span fontWeight=&quot;normal&quot;&gt;.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontWeight=&quot;normal&quot;&gt;Among the following constants, select those that belong to &lt;/span&gt;&lt;span fontSize=&quot;24&quot; fontWeight=&quot;bold&quot;&gt;#p&lt;/span&gt;&lt;span fontWeight=&quot;normal&quot;&gt;.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfi"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#g&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#g&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfj"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#h&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#h&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfk"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot; fontWeight=&quot;normal&quot;&gt;#i&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot; fontWeight=&quot;normal&quot;&gt;#i&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfl"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#r&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#r&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfm"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#s&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#s&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfn"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#t&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#t&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfo"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#m&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#m&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfp"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#n&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textNormal2&quot;&gt;&lt;span fontSize=&quot;17&quot;&gt;#n&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfq"><content><text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#g&lt;/span&gt;&lt;span&gt; fait partie de #p. #g peut s\'écrire #v.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#g&lt;/span&gt;&lt;span&gt; is a part of #p. #g can be expressed #v.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource><resource id="egdzfr">      <content>        <text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#h&lt;/span&gt;&lt;span&gt; est un élément de #p. #h peut s\'écrire #w.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#h&lt;/span&gt;&lt;span&gt; is an element of #p. #h can be expressed #w.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />      </content>    </resource>    <resource id="egdzfs">     <content> <text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#i&lt;/span&gt;&lt;span&gt; est un élément de #p. #i peut s\'écrire #x.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /><text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#i&lt;/span&gt;&lt;span&gt; is an element of #p. #i can be expressed #x.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" /></content></resource>    <resource id="egdzft">    <content>        <text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#r&lt;/span&gt;&lt;span&gt; est un élément de #p, car #r = #a qui peut s\'écrire sous la forme #y.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />    <text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#r&lt;/span&gt;&lt;span&gt; is an element of #p, because #r = #a which can be expressed in the form #y.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />  </content>  </resource>  <resource id="egdzfu">   <content>    <text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#s&lt;/span&gt;&lt;span&gt; n\'est pas un élément de #p, car #s = #u... qui a un nombre infini de chiffres après la virgule et qui aussi, n\'est pas périodique. Il ne peut donc pas s\'écrire sous la forme #d.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />  <text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#s&lt;/span&gt;&lt;span&gt; is not an element of #p, because #s = #u... which has an infinite number of digits after the decimal point and that too, is not repeating. Therefore it cannot be expressed in the form #d.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />  </content>  </resource> <resource id="egdzfv">   <content>   <text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#t&lt;/span&gt;&lt;span&gt; n\'est pas un élément de #p, car la racine carrée d\'un nombre négatif est une expression non définie dans l\'ensemble des nombres réels.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />   <text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#t&lt;/span&gt;&lt;span&gt; is not an element of #p, because the square root of a negative number is not defined in the set of real numbers.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />  </content> </resource> <resource id="egdzfw">  <content>   <text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#m&lt;/span&gt;&lt;span&gt; est un élément de #p. Il est sous la forme #d.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />  <text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#m&lt;/span&gt;&lt;span&gt; is an element of #p. It is in the form #d.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />  </content> </resource> <resource id="egdzfx">  <content>  <text content="&lt;TextFlow version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#n&lt;/span&gt;&lt;span&gt; est un élément de #p. Il est sous la forme #d.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />  <text locale="en" content="&lt;TextFlow locale=&quot;en&quot; version=&quot;2.0.0&quot; xmlns=&quot;http://ns.adobe.com/textLayout/2008&quot;&gt;&lt;p styleName=&quot;textDefault&quot;&gt;&lt;span fontWeight=&quot;bold&quot;&gt;#n&lt;/span&gt;&lt;span&gt; is an element of #p. It is in the form #d.&lt;/span&gt;&lt;/p&gt;&lt;/TextFlow&gt;" />  </content> </resource> </resources>';

     var xmlResult, xmlRessResult = {};

     parseString(xmlString, function (err, result) {
        xmlResult = result;
     });

     parseString(xmlStringRess, function (err, result) {

        //console.log(result);

        //console.log(result.resources.resource);

        result.resources.resource.forEach(function(ress, index){
            //console.log(ress);
            xmlRessResult[ress.$.id] = ress.content[0].text[0].$.content;
        });
     });


     this.state = { xml : xmlResult, 
                    ress : xmlRessResult };

	}


	render(){
    return (
          <div>
            <h1>Page 1</h1>          
            <MultipleChoices xml={this.state.xml} ress={this.state.ress}  />
          </div>

      );
	}

}


export default Bookpage;