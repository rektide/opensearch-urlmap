var _extractSearchParam= /(.*)\{searchTerm.*?\}(.*)/
function _extract(urlTemplate){
	var searchUrlTemplate= _extractSearchParam.exec(urlTemplate)
	if(!searchUrlTemplate)
		return urlTemplate
	return [searchUrlTemplate[1], null, searchUrlTemplate[2]]
}

/** SearchUrlMap */
function SearchUrlMap(searchMap,opts){
	for(var i in searchMap){
		this.set(i,searchMap[i])
	}
	if(opts.safe)
		this.safe= true
}
SearchUrlMap.prototype.set= function(nsPrefix,urlTemplate){
	var result= this.searchMap[nsPrefix]= _extract(urlTemplate)
	if(this.safe && urlTemplate == result)
		throw "Set something aside from a OpenSearch url mapping"
}
SearchUrlMap.prototype.get= function(key){
	var nsPrefix= key.split(":",1)
	if(nsPrefix.length == key.length){
		if(this.safe){
			throw "Key entirely lacks a namespace prefix"
		}else{
			return Map.prototype.get.apply(this,arguments)
		}
	}
	var searchTemplate= this.searchMap[nsPrefix]
	if(!searchTemplate)
		throw "No Search template registered for "+nsPrefix
	if(searchTemplate.size != 3)
		return searchTemplate // impossible in unsafe
	searchTemplate[1]= key
	return searchTemplate.join("")
}
util.inherits(SearchUrlMap, Map)
