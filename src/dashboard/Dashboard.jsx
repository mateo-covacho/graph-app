import React, { useState } from "react";
import "./dashboard.css";
import { Network, Node, Edge } from "react-vis-network";

//___________________________________________
import { AiOutlineHome } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { FaBitcoin } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { Link } from "react-router-dom";
//___________________________________________

const Dashboard = (props) => {
  const [toolBar, setToolBar] = useState("graph");

  var options = {
    physics: {
      stabilization: false,
    },
    autoResize: true,
    edges: {
      smooth: true,
      color: "#000000",
      widt: 0.5,
      arrows: {
        enabled: true,
        scaleFactor: 0.5,
      },
    },
  };

  if (props.isAdmin) {
    return (
      <div className="container-fluid p-0">
        <nav className="navbar navbar-light bg-light p-0 ">
          <div className="iconss-bar col-12 row  gx-0">
            <Link to="/">
              <div className="row col-12 gx-0 ">
                <AiOutlineHome className=" my-auto col-2 icon my-2  " />
                <p className=" my-auto col align-bottom ps-3 ">Home</p>
              </div>
            </Link>
            <div className="row col-1 gx-0 ">
              <BiNetworkChart className="col-2 icon my-2  my-auto" />
              <p className=" my-auto col align-bottom ps-3 ">Graph</p>
            </div>

            <div className="row col-1 gx-0 ">
              <GrInstagram className="col-2 icon my-2 my-auto" />
              <p className=" my-auto col align-bottom ps-3 ">Social</p>
            </div>
            <div className="row col-1 gx-0 ">
              <GiPathDistance className="col-2 icon my-2 my-auto" />
              <p className=" my-auto col align-bottom ps-3 ">Algorithm</p>
            </div>

            <div className="row col-3 gx-0 text-nowrap my-auto">
              <FaBitcoin className=" col-1 icon my-2 " />
              <p className=" my-auto col align-bottom  text-nowrap ps-3 ">
                Blockchain
              </p>
            </div>
          </div>
          <div className="row g-0 toolbar">
            {(() => {
              switch (toolBar) {
                case "graph":
                  return (
                    <div>
                      <p>Hello dd</p>
                    </div>
                  );
                  break;
                case "social_media":
                  return (
                    <div>
                      <p>Hello</p>
                    </div>
                  );
                  break;
                case "blockchain":
                  return (
                    <div>
                      <p>Hello</p>
                    </div>
                  );
                  break;
                default:
                  return null;
                  break;
              }
            }).call(this)}
          </div>
        </nav>
        <div className="graph-canvas">
          <Network
            options={{
              nodes: {
                shape: "dot",
                size: 16,
              },
              physics: {
                stabilization: false,
                wind: { x: 0, y: 0 },
              },
            }}
          >
            <Node id="0" label="Myriel" group="1" />
            <Node id="1" label="Napoleon" group="1" />
            <Node id="2" label="Mlle.Baptistine" group="1" />
            <Node id="3" label="Mme.Magloire" group="1" />
            <Node id="4" label="CountessdeLo" group="1" />
            <Node id="5" label="Geborand" group="1" />
            <Node id="6" label="Champtercier" group="1" />
            <Node id="7" label="Cravatte" group="1" />
            <Node id="8" label="Count" group="1" />
            <Node id="9" label="OldMan" group="1" />
            <Node id="10" label="Labarre" group="2" />
            <Node id="11" label="Valjean" group="2" />
            <Node id="12" label="Marguerite" group="3" />
            <Node id="13" label="Mme.deR" group="2" />
            <Node id="14" label="Isabeau" group="2" />
            <Node id="15" label="Gervais" group="2" />
            <Node id="16" label="Tholomyes" group="3" />
            <Node id="17" label="Listolier" group="3" />
            <Node id="18" label="Fameuil" group="3" />
            <Node id="19" label="Blacheville" group="3" />
            <Node id="20" label="Favourite" group="3" />
            <Node id="21" label="Dahlia" group="3" />
            <Node id="22" label="Zephine" group="3" />
            <Node id="23" label="Fantine" group="3" />
            <Node id="24" label="Mme.Thenardier" group="4" />
            <Node id="25" label="Thenardier" group="4" />
            <Node id="26" label="Cosette" group="5" />
            <Node id="27" label="Javert" group="4" />
            <Node id="28" label="Fauchelevent" group="0" />
            <Node id="29" label="Bamatabois" group="2" />
            <Node id="30" label="Perpetue" group="3" />
            <Node id="31" label="Simplice" group="2" />
            <Node id="32" label="Scaufflaire" group="2" />
            <Node id="33" label="Woman1" group="2" />
            <Node id="34" label="Judge" group="2" />
            <Node id="35" label="Champmathieu" group="2" />
            <Node id="36" label="Brevet" group="2" />
            <Node id="37" label="Chenildieu" group="2" />
            <Node id="38" label="Cochepaille" group="2" />
            <Node id="39" label="Pontmercy" group="4" />
            <Node id="40" label="Boulatruelle" group="6" />
            <Node id="41" label="Eponine" group="4" />
            <Node id="42" label="Anzelma" group="4" />
            <Node id="43" label="Woman2" group="5" />
            <Node id="44" label="MotherInnocent" group="0" />
            <Node id="45" label="Gribier" group="0" />
            <Node id="46" label="Jondrette" group="7" />
            <Node id="47" label="Mme.Burgon" group="7" />
            <Node id="48" label="Gavroche" group="8" />
            <Node id="49" label="Gillenormand" group="5" />
            <Node id="50" label="Magnon" group="5" />
            <Node id="51" label="Mlle.Gillenormand" group="5" />
            <Node id="52" label="Mme.Pontmercy" group="5" />
            <Node id="53" label="Mlle.Vaubois" group="5" />
            <Node id="54" label="Lt.Gillenormand" group="5" />
            <Node id="55" label="Marius" group="8" />
            <Node id="56" label="BaronessT" group="5" />
            <Node id="57" label="Mabeuf" group="8" />
            <Node id="58" label="Enjolras" group="8" />
            <Node id="59" label="Combeferre" group="8" />
            <Node id="60" label="Prouvaire" group="8" />
            <Node id="61" label="Feuilly" group="8" />
            <Node id="62" label="Courfeyrac" group="8" />
            <Node id="63" label="Bahorel" group="8" />
            <Node id="64" label="Bossuet" group="8" />
            <Node id="65" label="Joly" group="8" />
            <Node id="66" label="Grantaire" group="8" />
            <Node id="67" label="MotherPlutarch" group="9" />
            <Node id="68" label="Gueulemer" group="4" />
            <Node id="69" label="Babet" group="4" />
            <Node id="70" label="Claquesous" group="4" />
            <Node id="71" label="Montparnasse" group="4" />
            <Node id="72" label="Toussaint" group="5" />
            <Node id="73" label="Child1" group="10" />
            <Node id="74" label="Child2" group="10" />
            <Node id="75" label="Brujon" group="4" />
            <Node id="76" label="Mme.Hucheloup" group="8" />
            <Edge id="1" from="1" to="0" />
            <Edge id="2" from="2" to="0" />
            <Edge id="3" from="3" to="0" />
            <Edge id="4" from="3" to="2" />
            <Edge id="5" from="4" to="0" />
            <Edge id="6" from="5" to="0" />
            <Edge id="7" from="6" to="0" />
            <Edge id="8" from="7" to="0" />
            <Edge id="9" from="8" to="0" />
            <Edge id="10" from="9" to="0" />
            <Edge id="11" from="11" to="10" />
            <Edge id="12" from="11" to="3" />
            <Edge id="13" from="11" to="2" />
            <Edge id="14" from="11" to="0" />
            <Edge id="15" from="12" to="11" />
            <Edge id="16" from="13" to="11" />
            <Edge id="17" from="14" to="11" />
            <Edge id="18" from="15" to="11" />
            <Edge id="19" from="17" to="16" />
            <Edge id="20" from="18" to="16" />
            <Edge id="21" from="18" to="17" />
            <Edge id="22" from="19" to="16" />
            <Edge id="23" from="19" to="17" />
            <Edge id="24" from="19" to="18" />
            <Edge id="25" from="20" to="16" />
            <Edge id="26" from="20" to="17" />
            <Edge id="27" from="20" to="18" />
            <Edge id="28" from="20" to="19" />
            <Edge id="29" from="21" to="16" />
            <Edge id="30" from="21" to="17" />
            <Edge id="31" from="21" to="18" />
            <Edge id="32" from="21" to="19" />
            <Edge id="33" from="21" to="20" />
            <Edge id="34" from="22" to="16" />
            <Edge id="35" from="22" to="17" />
            <Edge id="36" from="22" to="18" />
            <Edge id="37" from="22" to="19" />
            <Edge id="38" from="22" to="20" />
            <Edge id="39" from="22" to="21" />
            <Edge id="40" from="23" to="16" />
            <Edge id="41" from="23" to="17" />
            <Edge id="42" from="23" to="18" />
            <Edge id="43" from="23" to="19" />
            <Edge id="44" from="23" to="20" />
            <Edge id="45" from="23" to="21" />
            <Edge id="46" from="23" to="22" />
            <Edge id="47" from="23" to="12" />
            <Edge id="48" from="23" to="11" />
            <Edge id="49" from="24" to="23" />
            <Edge id="50" from="24" to="11" />
            <Edge id="51" from="25" to="24" />
            <Edge id="52" from="25" to="23" />
            <Edge id="53" from="25" to="11" />
            <Edge id="54" from="26" to="24" />
            <Edge id="55" from="26" to="11" />
            <Edge id="56" from="26" to="16" />
            <Edge id="57" from="26" to="25" />
            <Edge id="58" from="27" to="11" />
            <Edge id="59" from="27" to="23" />
            <Edge id="60" from="27" to="25" />
            <Edge id="61" from="27" to="24" />
            <Edge id="62" from="27" to="26" />
            <Edge id="63" from="28" to="11" />
            <Edge id="64" from="28" to="27" />
            <Edge id="65" from="29" to="23" />
            <Edge id="66" from="29" to="27" />
            <Edge id="67" from="29" to="11" />
            <Edge id="68" from="30" to="23" />
            <Edge id="69" from="31" to="30" />
            <Edge id="70" from="31" to="11" />
            <Edge id="71" from="31" to="23" />
            <Edge id="72" from="31" to="27" />
            <Edge id="73" from="32" to="11" />
            <Edge id="74" from="33" to="11" />
            <Edge id="75" from="33" to="27" />
            <Edge id="76" from="34" to="11" />
            <Edge id="77" from="34" to="29" />
            <Edge id="78" from="35" to="11" />
            <Edge id="79" from="35" to="34" />
            <Edge id="80" from="35" to="29" />
            <Edge id="81" from="36" to="34" />
            <Edge id="82" from="36" to="35" />
            <Edge id="83" from="36" to="11" />
            <Edge id="84" from="36" to="29" />
            <Edge id="85" from="37" to="34" />
            <Edge id="86" from="37" to="35" />
            <Edge id="87" from="37" to="36" />
            <Edge id="88" from="37" to="11" />
            <Edge id="89" from="37" to="29" />
            <Edge id="90" from="38" to="34" />
            <Edge id="91" from="38" to="35" />
            <Edge id="92" from="38" to="36" />
            <Edge id="93" from="38" to="37" />
            <Edge id="94" from="38" to="11" />
            <Edge id="95" from="38" to="29" />
            <Edge id="96" from="39" to="25" />
            <Edge id="97" from="40" to="25" />
            <Edge id="98" from="41" to="24" />
            <Edge id="99" from="41" to="25" />
            <Edge id="100" from="42" to="41" />
            <Edge id="101" from="42" to="25" />
            <Edge id="102" from="42" to="24" />
            <Edge id="103" from="43" to="11" />
            <Edge id="104" from="43" to="26" />
            <Edge id="105" from="43" to="27" />
            <Edge id="106" from="44" to="28" />
            <Edge id="107" from="44" to="11" />
            <Edge id="108" from="45" to="28" />
            <Edge id="109" from="47" to="46" />
            <Edge id="110" from="48" to="47" />
            <Edge id="111" from="48" to="25" />
            <Edge id="112" from="48" to="27" />
            <Edge id="113" from="48" to="11" />
            <Edge id="114" from="49" to="26" />
            <Edge id="115" from="49" to="11" />
            <Edge id="116" from="50" to="49" />
            <Edge id="117" from="50" to="24" />
            <Edge id="118" from="51" to="49" />
            <Edge id="119" from="51" to="26" />
            <Edge id="120" from="51" to="11" />
            <Edge id="121" from="52" to="51" />
            <Edge id="122" from="52" to="39" />
            <Edge id="123" from="53" to="51" />
            <Edge id="124" from="54" to="51" />
            <Edge id="125" from="54" to="49" />
            <Edge id="126" from="54" to="26" />
            <Edge id="127" from="55" to="51" />
            <Edge id="128" from="55" to="49" />
            <Edge id="129" from="55" to="39" />
            <Edge id="130" from="55" to="54" />
            <Edge id="131" from="55" to="26" />
            <Edge id="132" from="55" to="11" />
            <Edge id="133" from="55" to="16" />
            <Edge id="134" from="55" to="25" />
            <Edge id="135" from="55" to="41" />
            <Edge id="136" from="55" to="48" />
            <Edge id="137" from="56" to="49" />
            <Edge id="138" from="56" to="55" />
            <Edge id="139" from="57" to="55" />
            <Edge id="140" from="57" to="41" />
            <Edge id="141" from="57" to="48" />
            <Edge id="142" from="58" to="55" />
            <Edge id="143" from="58" to="48" />
            <Edge id="144" from="58" to="27" />
            <Edge id="145" from="58" to="57" />
            <Edge id="146" from="58" to="11" />
            <Edge id="147" from="59" to="58" />
            <Edge id="148" from="59" to="55" />
            <Edge id="149" from="59" to="48" />
            <Edge id="150" from="59" to="57" />
            <Edge id="151" from="60" to="48" />
            <Edge id="152" from="60" to="58" />
            <Edge id="153" from="60" to="59" />
            <Edge id="154" from="61" to="48" />
            <Edge id="155" from="61" to="58" />
            <Edge id="156" from="61" to="60" />
            <Edge id="157" from="61" to="59" />
            <Edge id="158" from="61" to="57" />
            <Edge id="159" from="61" to="55" />
            <Edge id="160" from="62" to="55" />
            <Edge id="161" from="62" to="58" />
            <Edge id="162" from="62" to="59" />
            <Edge id="163" from="62" to="48" />
            <Edge id="164" from="62" to="57" />
            <Edge id="165" from="62" to="41" />
            <Edge id="166" from="62" to="61" />
            <Edge id="167" from="62" to="60" />
            <Edge id="168" from="63" to="59" />
            <Edge id="169" from="63" to="48" />
            <Edge id="170" from="63" to="62" />
            <Edge id="171" from="63" to="57" />
            <Edge id="172" from="63" to="58" />
            <Edge id="173" from="63" to="61" />
            <Edge id="174" from="63" to="60" />
            <Edge id="175" from="63" to="55" />
            <Edge id="176" from="64" to="55" />
            <Edge id="177" from="64" to="62" />
            <Edge id="178" from="64" to="48" />
            <Edge id="179" from="64" to="63" />
            <Edge id="180" from="64" to="58" />
            <Edge id="181" from="64" to="61" />
            <Edge id="182" from="64" to="60" />
            <Edge id="183" from="64" to="59" />
            <Edge id="184" from="64" to="57" />
            <Edge id="185" from="64" to="11" />
            <Edge id="186" from="65" to="63" />
            <Edge id="187" from="65" to="64" />
            <Edge id="188" from="65" to="48" />
            <Edge id="189" from="65" to="62" />
            <Edge id="190" from="65" to="58" />
            <Edge id="191" from="65" to="61" />
            <Edge id="192" from="65" to="60" />
            <Edge id="193" from="65" to="59" />
            <Edge id="194" from="65" to="57" />
            <Edge id="195" from="65" to="55" />
            <Edge id="196" from="66" to="64" />
            <Edge id="197" from="66" to="58" />
            <Edge id="198" from="66" to="59" />
            <Edge id="199" from="66" to="62" />
            <Edge id="200" from="66" to="65" />
            <Edge id="201" from="66" to="48" />
            <Edge id="202" from="66" to="63" />
            <Edge id="203" from="66" to="61" />
            <Edge id="204" from="66" to="60" />
            <Edge id="205" from="67" to="57" />
            <Edge id="206" from="68" to="25" />
            <Edge id="207" from="68" to="11" />
            <Edge id="208" from="68" to="24" />
            <Edge id="209" from="68" to="27" />
            <Edge id="210" from="68" to="48" />
            <Edge id="211" from="68" to="41" />
            <Edge id="212" from="69" to="25" />
            <Edge id="213" from="69" to="68" />
            <Edge id="214" from="69" to="11" />
            <Edge id="215" from="69" to="24" />
            <Edge id="216" from="69" to="27" />
            <Edge id="217" from="69" to="48" />
            <Edge id="218" from="69" to="41" />
            <Edge id="219" from="70" to="25" />
            <Edge id="220" from="70" to="69" />
            <Edge id="221" from="70" to="68" />
            <Edge id="222" from="70" to="11" />
            <Edge id="223" from="70" to="24" />
            <Edge id="224" from="70" to="27" />
            <Edge id="225" from="70" to="41" />
            <Edge id="226" from="70" to="58" />
            <Edge id="227" from="71" to="27" />
            <Edge id="228" from="71" to="69" />
            <Edge id="229" from="71" to="68" />
            <Edge id="230" from="71" to="70" />
            <Edge id="231" from="71" to="11" />
            <Edge id="232" from="71" to="48" />
            <Edge id="233" from="71" to="41" />
            <Edge id="234" from="71" to="25" />
            <Edge id="235" from="72" to="26" />
            <Edge id="236" from="72" to="27" />
            <Edge id="237" from="72" to="11" />
            <Edge id="238" from="73" to="48" />
            <Edge id="239" from="74" to="48" />
            <Edge id="240" from="74" to="73" />
            <Edge id="241" from="75" to="69" />
            <Edge id="242" from="75" to="68" />
            <Edge id="243" from="75" to="25" />
            <Edge id="244" from="75" to="48" />
            <Edge id="245" from="75" to="41" />
            <Edge id="246" from="75" to="70" />
            <Edge id="247" from="75" to="71" />
            <Edge id="248" from="76" to="64" />
            <Edge id="249" from="76" to="65" />
            <Edge id="250" from="76" to="66" />
            <Edge id="251" from="76" to="63" />
            <Edge id="252" from="76" to="62" />
            <Edge id="253" from="76" to="48" />
            <Edge id="254" from="76" to="58" />
          </Network>
        </div>
      </div>
    );
  } else {
    return <h1>please sign in</h1>;
  }
};

export default Dashboard;
