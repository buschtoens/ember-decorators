'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const setupPodConfig = blueprintHelpers.setupPodConfig;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;
const fs = require('fs-extra');

describe('Blueprint: classic-component', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    it('classic-component x-foo', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo'], _file => {
        expect(_file('app/components/x-foo.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('}');

        expect(_file('app/templates/components/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('tests/integration/components/x-foo-test.js')).to.exist;
      });
    });

    it('classic-component foo/x-foo', function() {
      return emberGenerateDestroy(['classic-component', 'foo/x-foo'], _file => {
        expect(_file('app/components/foo/x-foo.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class FooXFooComponent extends Component {')
          .to.contain('}');

        expect(_file('app/templates/components/foo/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('tests/integration/components/foo/x-foo-test.js')).to.exist;
      });
    });

    it('classic-component x-foo --path foo', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo', '--path', 'foo'], _file => {
        expect(_file('app/components/x-foo.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('}');

        expect(_file('app/templates/components/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('tests/integration/components/x-foo-test.js')).to.exist;
      });
    });

    it('classic-component x-foo --pod', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo', '--pod'], _file => {
        expect(_file('app/components/x-foo/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('}');

        expect(_file('app/components/x-foo/template.hbs')).to.equal('{{yield}}');

        expect(_file('tests/integration/components/x-foo/component-test.js')).to.exist;
      });
    });

    it('classic-component foo/x-foo --pod', function() {
      return emberGenerateDestroy(['classic-component', 'foo/x-foo', '--pod'], _file => {
        expect(_file('app/components/foo/x-foo/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class FooXFooComponent extends Component {')
          .to.contain('}');

        expect(_file('app/components/foo/x-foo/template.hbs')).to.equal('{{yield}}');

        expect(_file('tests/integration/components/foo/x-foo/component-test.js')).to.exist;
      });
    });

    it('classic-component x-foo --pod --path bar', function() {
      return emberGenerateDestroy(
        ['classic-component', 'x-foo', '--pod', '--path', 'bar'],
        _file => {
          expect(_file('app/bar/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain('export default class XFooComponent extends Component {')
            .to.contain('}');

          expect(_file('app/bar/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/bar/x-foo/component-test.js')).to.exist;
        }
      );
    });

    it('classic-component foo/x-foo --pod --path bar', function() {
      return emberGenerateDestroy(
        ['classic-component', 'foo/x-foo', '--pod', '--path', 'bar'],
        _file => {
          expect(_file('app/bar/foo/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain('export default class FooXFooComponent extends Component {')
            .to.contain('}');

          expect(_file('app/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/bar/foo/x-foo/component-test.js')).to.exist;
        }
      );
    });

    it('classic-component x-foo --pod --path bar/baz', function() {
      return emberGenerateDestroy(
        ['classic-component', 'x-foo', '--pod', '--path', 'bar/baz'],
        _file => {
          expect(_file('app/bar/baz/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain('export default class XFooComponent extends Component {')
            .to.contain('}');

          expect(_file('app/bar/baz/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/bar/baz/x-foo/component-test.js')).to.exist;
        }
      );
    });

    it('classic-component foo/x-foo --pod --path bar/baz', function() {
      return emberGenerateDestroy(
        ['classic-component', 'foo/x-foo', '--pod', '--path', 'bar/baz'],
        _file => {
          expect(_file('app/bar/baz/foo/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain('export default class FooXFooComponent extends Component {')
            .to.contain('}');

          expect(_file('app/bar/baz/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/bar/baz/foo/x-foo/component-test.js')).to.exist;
        }
      );
    });

    it('classic-component x-foo --pod -no-path', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo', '--pod', '-no-path'], _file => {
        expect(_file('app/x-foo/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('}');

        expect(_file('app/x-foo/template.hbs')).to.equal('{{yield}}');

        expect(_file('tests/integration/x-foo/component-test.js')).to.exist;
      });
    });

    it('classic-component foo/x-foo --pod -no-path', function() {
      return emberGenerateDestroy(
        ['classic-component', 'foo/x-foo', '--pod', '-no-path'],
        _file => {
          expect(_file('app/foo/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain('export default class FooXFooComponent extends Component {')
            .to.contain('}');

          expect(_file('app/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/foo/x-foo/component-test.js')).to.exist;
        }
      );
    });

    describe('with podModulePrefix', function() {
      beforeEach(function() {
        setupPodConfig({ podModulePrefix: true });
      });

      it('classic-component x-foo --pod', function() {
        return emberGenerateDestroy(['classic-component', 'x-foo', '--pod'], _file => {
          expect(_file('app/pods/components/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain('export default class XFooComponent extends Component {')
            .to.contain('}');

          expect(_file('app/pods/components/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/pods/components/x-foo/component-test.js')).to.exist;
        });
      });

      it('classic-component foo/x-foo --pod', function() {
        return emberGenerateDestroy(['classic-component', 'foo/x-foo', '--pod'], _file => {
          expect(_file('app/pods/components/foo/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain('export default class FooXFooComponent extends Component {')
            .to.contain('}');

          expect(_file('app/pods/components/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/pods/components/foo/x-foo/component-test.js')).to.exist;
        });
      });

      it('classic-component x-foo --pod --path bar', function() {
        return emberGenerateDestroy(
          ['classic-component', 'x-foo', '--pod', '--path', 'bar'],
          _file => {
            expect(_file('app/pods/bar/x-foo/component.js'))
              .to.contain("import Component from '@ember/component';")
              .to.contain('export default class XFooComponent extends Component {')
              .to.contain('}');

            expect(_file('app/pods/bar/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/bar/x-foo/component-test.js')).to.exist;
          }
        );
      });

      it('classic-component foo/x-foo --pod --path bar', function() {
        return emberGenerateDestroy(
          ['classic-component', 'foo/x-foo', '--pod', '--path', 'bar'],
          _file => {
            expect(_file('app/pods/bar/foo/x-foo/component.js'))
              .to.contain("import Component from '@ember/component';")
              .to.contain('export default class FooXFooComponent extends Component {')
              .to.contain('}');

            expect(_file('app/pods/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/bar/foo/x-foo/component-test.js')).to.exist;
          }
        );
      });

      it('classic-component x-foo --pod --path bar/baz', function() {
        return emberGenerateDestroy(
          ['classic-component', 'x-foo', '--pod', '--path', 'bar/baz'],
          _file => {
            expect(_file('app/pods/bar/baz/x-foo/component.js'))
              .to.contain("import Component from '@ember/component';")
              .to.contain('export default class XFooComponent extends Component {')
              .to.contain('}');

            expect(_file('app/pods/bar/baz/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/bar/baz/x-foo/component-test.js')).to.exist;
          }
        );
      });

      it('classic-component foo/x-foo --pod --path bar/baz', function() {
        return emberGenerateDestroy(
          ['classic-component', 'foo/x-foo', '--pod', '--path', 'bar/baz'],
          _file => {
            expect(_file('app/pods/bar/baz/foo/x-foo/component.js'))
              .to.contain("import Component from '@ember/component';")
              .to.contain('export default class FooXFooComponent extends Component {')
              .to.contain('}');

            expect(_file('app/pods/bar/baz/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/bar/baz/foo/x-foo/component-test.js')).to.exist;
          }
        );
      });

      it('classic-component x-foo --pod -no-path', function() {
        return emberGenerateDestroy(['classic-component', 'x-foo', '--pod', '-no-path'], _file => {
          expect(_file('app/pods/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain('export default class XFooComponent extends Component {')
            .to.contain('}');

          expect(_file('app/pods/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/pods/x-foo/component-test.js')).to.exist;
        });
      });

      it('classic-component foo/x-foo --pod -no-path', function() {
        return emberGenerateDestroy(
          ['classic-component', 'foo/x-foo', '--pod', '-no-path'],
          _file => {
            expect(_file('app/pods/foo/x-foo/component.js'))
              .to.contain("import Component from '@ember/component';")
              .to.contain('export default class FooXFooComponent extends Component {')
              .to.contain('}');

            expect(_file('app/pods/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/foo/x-foo/component-test.js')).to.exist;
          }
        );
      });
    });
  });

  describe.skip('in app - module unification', function() {
    beforeEach(function() {
      return emberNew().then(() => fs.ensureDirSync('src'));
    });

    it('classic-component x-foo', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo'], _file => {
        expect(_file('src/ui/components/x-foo/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('}');

        expect(_file('src/ui/components/x-foo/template.hbs')).to.equal('{{yield}}');

        expect(_file('src/ui/components/x-foo/component-test.js')).to.exist;
      });
    });

    it('classic-component foo/x-foo', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo/x-bar'], _file => {
        expect(_file('src/ui/components/x-foo/x-bar/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class FooXFooComponent extends Component {')
          .to.contain('}');

        expect(_file('src/ui/components/x-foo/x-bar/template.hbs')).to.equal('{{yield}}');

        expect(_file('src/ui/components/x-foo/x-bar/component-test.js')).to.exist;
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' });
    });

    it('classic-component x-foo', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo'], _file => {
        expect(_file('addon/components/x-foo.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain("import layout from '../templates/components/x-foo';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('layout')
          .to.contain('}');

        expect(_file('addon/templates/components/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/x-foo.js')).to.contain(
          "export { default } from 'my-addon/components/x-foo';"
        );

        expect(_file('tests/integration/components/x-foo-test.js')).to.exist;
      });
    });

    it('classic-component nested/x-foo', function() {
      return emberGenerateDestroy(['classic-component', 'nested/x-foo'], _file => {
        expect(_file('addon/components/nested/x-foo.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain("import layout from '../../templates/components/nested/x-foo';")
          .to.contain('export default class NestedXFooComponent extends Component {')
          .to.contain('layout')
          .to.contain('}');

        expect(_file('addon/templates/components/nested/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/nested/x-foo.js')).to.contain(
          "export { default } from 'my-addon/components/nested/x-foo';"
        );

        expect(_file('tests/integration/components/nested/x-foo-test.js')).to.exist;
      });
    });

    it('classic-component x-foo --dummy', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo', '--dummy'], _file => {
        expect(_file('tests/dummy/app/components/x-foo.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('}');

        expect(_file('tests/dummy/app/templates/components/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/x-foo.js')).to.not.exist;

        expect(_file('tests/unit/components/x-foo-test.js')).to.not.exist;
      });
    });

    it('classic-component nested/x-foo --dummy', function() {
      return emberGenerateDestroy(['classic-component', 'nested/x-foo', '--dummy'], _file => {
        expect(_file('tests/dummy/app/components/nested/x-foo.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class NestedXFooComponent extends Component {')
          .to.contain('}');

        expect(_file('tests/dummy/app/templates/components/nested/x-foo.hbs')).to.equal(
          '{{yield}}'
        );

        expect(_file('app/components/nested/x-foo.js')).to.not.exist;

        expect(_file('tests/unit/components/nested/x-foo-test.js')).to.not.exist;
      });
    });

    it('classic-component x-foo --pod', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo', '--pod'], _file => {
        expect(_file('addon/components/x-foo/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain("import layout from './template';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('layout')
          .to.contain('}');

        expect(_file('addon/components/x-foo/template.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/x-foo/component.js')).to.contain(
          "export { default } from 'my-addon/components/x-foo/component';"
        );

        expect(_file('tests/integration/components/x-foo/component-test.js')).to.exist;
      });
    });
  });

  describe.skip('in addon - module unification', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' }).then(() => fs.ensureDirSync('src'));
    });

    it('classic-component x-foo', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo'], _file => {
        expect(_file('src/ui/components/x-foo/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('}');

        expect(_file('src/ui/components/x-foo/template.hbs')).to.equal('{{yield}}');

        expect(_file('src/ui/components/x-foo/component-test.js')).to.exist;
      });
    });

    it('classic-component nested/x-foo', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo/x-bar'], _file => {
        expect(_file('src/ui/components/x-foo/x-bar/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class NestedXFooComponent extends Component {')
          .to.contain('}');

        expect(_file('src/ui/components/x-foo/x-bar/template.hbs')).to.equal('{{yield}}');

        expect(_file('src/ui/components/x-foo/x-bar/component-test.js')).to.exist;
      });
    });

    it('classic-component x-foo --dummy', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo', '--dummy'], _file => {
        expect(_file('tests/dummy/src/ui/components/x-foo/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class XFooComponent extends Component {')
          .to.contain('}');

        expect(_file('tests/dummy/src/ui/components/x-foo/template.hbs')).to.equal('{{yield}}');

        expect(_file('src/ui/components/x-foo/component.js')).to.not.exist;

        expect(_file('src/ui/components/x-foo/component-test.js')).to.not.exist;
      });
    });

    it('classic-component nested/x-foo --dummy', function() {
      return emberGenerateDestroy(['classic-component', 'x-foo/x-bar', '--dummy'], _file => {
        expect(_file('tests/dummy/src/ui/components/x-foo/x-bar/component.js'))
          .to.contain("import Component from '@ember/component';")
          .to.contain('export default class NestedXFooComponent extends Component {')
          .to.contain('}');

        expect(_file('tests/dummy/src/ui/components/x-foo/x-bar/template.hbs')).to.equal(
          '{{yield}}'
        );

        expect(_file('src/ui/components/x-foo/x-bar/component.js')).to.not.exist;

        expect(_file('src/ui/components/x-foo/x-bar/component-test.js')).to.not.exist;
      });
    });
  });

  describe('in in-repo-addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'in-repo-addon' });
    });

    it('classic-component x-foo --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(
        ['classic-component', 'x-foo', '--in-repo-addon=my-addon'],
        _file => {
          expect(_file('lib/my-addon/addon/components/x-foo.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain("import layout from '../templates/components/x-foo';")
            .to.contain('export default class XFooComponent extends Component {')
            .to.contain('layout')
            .to.contain('}');

          expect(_file('lib/my-addon/addon/templates/components/x-foo.hbs')).to.equal('{{yield}}');

          expect(_file('lib/my-addon/app/components/x-foo.js')).to.contain(
            "export { default } from 'my-addon/components/x-foo';"
          );

          expect(_file('tests/integration/components/x-foo-test.js')).to.exist;
        }
      );
    });

    it('classic-component nested/x-foo --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(
        ['classic-component', 'nested/x-foo', '--in-repo-addon=my-addon'],
        _file => {
          expect(_file('lib/my-addon/addon/components/nested/x-foo.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain("import layout from '../../templates/components/nested/x-foo';")
            .to.contain('export default class NestedXFooComponent extends Component {')
            .to.contain('layout')
            .to.contain('}');

          expect(_file('lib/my-addon/addon/templates/components/nested/x-foo.hbs')).to.equal(
            '{{yield}}'
          );

          expect(_file('lib/my-addon/app/components/nested/x-foo.js')).to.contain(
            "export { default } from 'my-addon/components/nested/x-foo';"
          );

          expect(_file('tests/integration/components/nested/x-foo-test.js')).to.exist;
        }
      );
    });

    it('classic-component x-foo --in-repo-addon=my-addon --pod', function() {
      return emberGenerateDestroy(
        ['classic-component', 'x-foo', '--in-repo-addon=my-addon', '--pod'],
        _file => {
          expect(_file('lib/my-addon/addon/components/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain("import layout from './template';")
            .to.contain('export default class XFooComponent extends Component {')
            .to.contain('layout')
            .to.contain('}');

          expect(_file('lib/my-addon/addon/components/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('lib/my-addon/app/components/x-foo/component.js')).to.contain(
            "export { default } from 'my-addon/components/x-foo/component';"
          );

          expect(_file('tests/integration/components/x-foo/component-test.js')).to.exist;
        }
      );
    });

    it('classic-component nested/x-foo --in-repo-addon=my-addon --pod', function() {
      return emberGenerateDestroy(
        ['classic-component', 'nested/x-foo', '--in-repo-addon=my-addon', '--pod'],
        _file => {
          expect(_file('lib/my-addon/addon/components/nested/x-foo/component.js'))
            .to.contain("import Component from '@ember/component';")
            .to.contain("import layout from './template';")
            .to.contain('export default class NestedXFooComponent extends Component {')
            .to.contain('layout')
            .to.contain('}');

          expect(_file('lib/my-addon/addon/components/nested/x-foo/template.hbs')).to.equal(
            '{{yield}}'
          );

          expect(_file('lib/my-addon/app/components/nested/x-foo/component.js')).to.contain(
            "export { default } from 'my-addon/components/nested/x-foo/component';"
          );

          expect(_file('tests/integration/components/nested/x-foo/component-test.js')).to.exist;
        }
      );
    });
  });

  describe.skip('in in-repo-addon - module unification', function() {
    beforeEach(function() {
      return emberNew({ target: 'in-repo-addon' }).then(() => fs.ensureDirSync('src'));
    });

    it('classic-component x-foo --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(
        ['classic-component', 'x-foo', '--in-repo-addon=my-addon'],
        _file => {
          expect(_file('packages/my-addon/src/ui/components/x-foo/component.js'))
            .to.contain('export default class XFooComponent extends Component {')
            .to.contain('}');

          expect(_file('packages/my-addon/src/ui/components/x-foo/template.hbs')).to.equal(
            '{{yield}}'
          );

          expect(_file('packages/my-addon/src/ui/components/x-foo/component-test.js')).to.exist;
        }
      );
    });
  });
});
