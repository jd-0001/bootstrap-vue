import hljs from '~/utils/hljs'
import MainDocs from '~/components/main-docs'
import docsMixin from '~/plugins/docs-mixin'
import { misc as miscMeta, defaultConfig } from '~/content'

const getReadMe = name =>
  import(`~/markdown/misc/${name}/README.md` /* webpackChunkName: "docs/misc" */)

export default {
  name: 'BDVMisc',
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(miscMeta[params.slug])
  },
  async asyncData({ params }) {
    let readme = (await getReadMe(params.slug)).default
    readme = readme.replace(
      '{{ defaultConfig }}',
      hljs.highlight('json', JSON.stringify(defaultConfig || {}, undefined, 2)).value
    )
    const meta = miscMeta[params.slug]
    return { meta, readme }
  },
  render(h) {
    return h(MainDocs, { staticClass: 'bd-components', props: { readme: this.readme } })
  }
}
