import BreadNavModule from './breadNav'
import BreadNavController from './breadNav.ctrl';
import BreadNavComponent from './breadNav.comp';
import BreadNavTemplate from './breadNav.html';

describe('BreadNav', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BreadNavModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BreadNavController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(BreadNavTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BreadNavComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BreadNavTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BreadNavController);
      });
  });
});
