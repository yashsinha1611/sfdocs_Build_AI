---
sidebar_position: 1
sidebar_label: Overview
---
# SnappyFlow Integrations
import {AGENTS, buttonLists} from './constants';

SnappyFlow support a wide range of build in integrations to help you get started quickly.
<div class="searchContrainer ">
			<img src="/img/search.png" />
			<input type="text" class="form-control" name="" placeholder="Search for SnappyFlow Integrations" />
	</div>
<dl class="buttonList marTop20">
{
 buttonLists.map((val) => (
    <dd><input type="button" value={val.label} class="btn-primarys" name=""  /></dd>
 ))
}
</dl>
<ul class="integration">
{
 AGENTS.map((items) => (
<li class="box_size">
 <label>
            <img src={items.src} />
    </label>
    <div>{items.label}</div>
    <div class="none">{items.overText}</div>
</li>
 ))
 }
</ul>
