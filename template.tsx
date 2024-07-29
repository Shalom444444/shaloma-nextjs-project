/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { Canvasa } from "@/components/Canvas";
import { RenderNode } from "@/components/render-node";
import { AnimatedBeamMultipleOutputDemo } from "@/components/user-component/animated-beam";
import { BorderBeamSimple } from "@/components/user-component/border-beam-simple";
import { Container } from "@/components/user-component/container";
import { SimpleFooter } from "@/components/user-component/simple-footer";
import { SimpleHeader } from "@/components/user-component/simple-header";
import { SimpleHero } from "@/components/user-component/simple-hero";
import { SimpleSection } from "@/components/user-component/simple-section";
import { Text } from "@/components/user-component/text";
import { Editor, Frame } from "@craftjs/core";
import { useEffect, useState } from "react";
import lz from "lzutf8";
import { Canvas } from "@/components/SimpleCanvas";


const loadPageData = () => {
    const data = localStorage.getItem('page');
    if (data) {
      const decompressedJson = lz.decompress(lz.decodeBase64(data));
      return decompressedJson;
    }
    return null;
  };
  
  const page = () => {
    const [json, setJson] = useState(null);
  
    useEffect(() => {
      const pageData = loadPageData();
      if (pageData) {
        setJson(pageData);
      }
    }, []);
  
    if (!json) return <div>Loading...</div>;
  
    return (
      <main>
              <Editor
        resolver={{ Canvasa, Text, SimpleHeader, SimpleFooter, SimpleHero, Container, SimpleSection, AnimatedBeamMultipleOutputDemo, BorderBeamSimple }}
        onRender={RenderNode}
        enabled={false}
      >
        <Frame data={json} />
      </Editor>
      </main>
    );
  };
  
  export default page;
  