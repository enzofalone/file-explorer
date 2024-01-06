export namespace main {
	
	export class directory {
	    url: string;
	    error: string;
	
	    static createFrom(source: any = {}) {
	        return new directory(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.error = source["error"];
	    }
	}
	export class entry {
	    name: string;
	    isDirectory: boolean;
	    modTime: string;
	    size: number;
	
	    static createFrom(source: any = {}) {
	        return new entry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.isDirectory = source["isDirectory"];
	        this.modTime = source["modTime"];
	        this.size = source["size"];
	    }
	}
	export class entryList {
	    entries: entry[];
	    error: string;
	
	    static createFrom(source: any = {}) {
	        return new entryList(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.entries = this.convertValues(source["entries"], entry);
	        this.error = source["error"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

