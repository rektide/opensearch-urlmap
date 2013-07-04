var _extractSearchParam= /(.*)\{searchTerm.*?\}(.*)/
function _extract(urlTemplate){
	var searchUrlTemplate= _extractSearchParam.exec(urlTemplate)
	if(!searchUrlTemplate)
		return urlTemplate
	return [searchUrlTemplate[1], null, searchUrlTemplate[2]]
}

/** SearchUrlMap */
function SearchUrlMap(searchMap){
	for(var i in searchMap){
		this.set(i,searchMap[i])
	}
}
SearchUrlMap.prototype.set= function(nsPrefix,urlTemplate){
	this.searchMap[nsPrefix]= urlTemplate
}
SearchUrlMap.prototype.get= function(key){
	var nsPrefix= key.split(":",1)
	if(nsPrefix.length == key.length)
		return Map.prototype.get.apply(this,arguments)
	var searchTemplate= this.searchMap[nsPrefix]
	if(!searchTemplate)
		throw "No Search template registered for "+nsPrefix
	if(searchTemplate.size != 3)
		return searchTemplate
	searchTemplate[1]= key
	return searchTemplate.join("")
}
util.inherits(SearchUrlMap, Map)
