import onigasm from './node_modules/onigasm/lib/onigasm.js'
import Registry from './node_modules/monaco-textmate/dist/main.js'
import wireTmGrammars from './node_modules/monaco-editor-textmate/dist/index.js'

export async function liftOff() {
  require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });
  require(['vs/editor/editor.main'], async function () {
    await loadWASM(`/node_modules/onigasm/lib/onigasm.wasm`)

    const registry = new Registry({
        getGrammarDefinition: async (scopeName) => {
            return {
                format: 'json',
                content: await (await fetch(`/langs/robloxlua.tmLanguage.json`)).text()
            }
        }
    })

    // map of monaco "language id's" to TextMate scopeNames
    const grammars = new Map()
    grammars.set('css', 'source.css')
    grammars.set('html', 'text.html.basic')
    grammars.set('typescript', 'source.ts')
    
    var editor = monaco.editor.create(document.getElementById('container'), {
        value: ['-- Made with Mikan', '-- Script'].join('\n'),
        language: 'robloxlua', // this won't work out of the box, see below for more info,
        automaticLayout: true
    })
    
    await wireTmGrammars(monaco, registry, grammars, editor);
  });
}